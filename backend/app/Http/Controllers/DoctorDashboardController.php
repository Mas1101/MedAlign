<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\QueueToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DoctorDashboardController extends Controller
{
    public function show(Request $request)
    {
        $doctor = $this->doctorFor($request);
        $base = QueueToken::with('patient')
            ->where('clinic_id', $doctor->clinic_id)
            ->where(function ($query) use ($doctor) {
                $query->where('doctor_id', $doctor->doctor_id)->orWhereNull('doctor_id');
            });

        $current = (clone $base)->where('doctor_id', $doctor->doctor_id)->where('status', 'called')
            ->orderBy('called_time')->first();
        $queue = (clone $base)->where('status', 'waiting')->orderBy('token_number')->limit(5)->get();
        $today = (clone $base)->whereDate('check_in_time', now()->toDateString());

        return response()->json([
            'doctor' => [
                'id' => $doctor->doctor_id,
                'name' => $doctor->user->name,
                'specialization' => $doctor->specialization,
                'availability_status' => $doctor->availability_status,
                'avg_consult_min' => $doctor->avg_consult_min,
            ],
            'current' => $this->token($current),
            'queue' => $queue->map(fn (QueueToken $token) => $this->token($token))->values(),
            'stats' => [
                'waiting' => (clone $base)->where('status', 'waiting')->count(),
                'completed_today' => (clone $today)->where('status', 'completed')->count(),
                'consulted_today' => (clone $today)->whereIn('status', ['called', 'completed'])->count(),
                'average_wait' => (int) ((clone $today)->whereNotNull('called_time')->avg(DB::raw('TIMESTAMPDIFF(MINUTE, check_in_time, called_time)')) ?? 0),
            ],
            'recent_prescriptions' => $doctor->prescriptions()->with('patient')->latest('issued_at')->limit(4)->get()->map(fn ($prescription) => [
                'id' => $prescription->prescription_id,
                'patient' => $prescription->patient->name,
                'issued_at' => $prescription->issued_at?->toIso8601String(),
            ]),
        ]);
    }

    public function callNext(Request $request)
    {
        $doctor = $this->doctorFor($request);
        $active = $this->activeToken($doctor);

        if ($active) {
            return response()->json(['message' => 'Complete or skip the current patient first.'], 409);
        }

        $token = QueueToken::where('clinic_id', $doctor->clinic_id)
            ->where('status', 'waiting')->orderBy('token_number')->firstOrFail();
        $token->update([
            'doctor_id' => $doctor->doctor_id,
            'status' => 'called',
            'called_time' => now(),
        ]);

        return response()->json(['current' => $this->token($token->load('patient'))]);
    }

    public function updateStatus(Request $request, QueueToken $token)
    {
        $doctor = $this->doctorFor($request);
        abort_unless($token->clinic_id === $doctor->clinic_id && $token->doctor_id === $doctor->doctor_id, 404);

        $status = $request->validate(['status' => ['required', 'in:skipped,completed,waiting']])['status'];
        $token->update([
            'status' => $status,
            'completed_time' => $status === 'completed' ? now() : null,
        ]);

        return response()->json(['message' => 'Queue updated.', 'current' => $status === 'called' ? $this->token($token->load('patient')) : null]);
    }

    private function doctorFor(Request $request): Doctor
    {
        $user = $request->user();

        return $user?->doctor()->with('user')->first()
            ?? Doctor::with('user')->orderBy('doctor_id')->firstOrFail();
    }

    private function activeToken(Doctor $doctor): ?QueueToken
    {
        return QueueToken::where('doctor_id', $doctor->doctor_id)->where('status', 'called')->first();
    }

    private function token(?QueueToken $token): ?array
    {
        if (!$token) {
            return null;
        }

        return [
            'id' => $token->token_id,
            'number' => $token->token_number,
            'status' => $token->status,
            'patient' => [
                'id' => $token->patient->patient_id,
                'name' => $token->patient->name,
                'phone' => $token->patient->phone,
                'dob' => $token->patient->dob?->format('Y-m-d'),
            ],
            'check_in_time' => $token->check_in_time?->toIso8601String(),
            'called_time' => $token->called_time?->toIso8601String(),
            'est_wait_time' => $token->est_wait_time,
        ];
    }
}
