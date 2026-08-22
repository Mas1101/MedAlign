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
        if (!$doctor) {
            return response()->json([
                'doctor' => null,
                'current' => null,
                'queue' => [],
                'stats' => ['waiting' => 0, 'completed_today' => 0, 'consulted_today' => 0, 'average_wait' => 0],
                'recent_prescriptions' => [],
            ]);
        }

        $base = QueueToken::with('patient')
            ->where('clinic_id', $doctor->clinic_id)
            ->where(function ($query) use ($doctor) {
                $query->where('doctor_id', $doctor->doctor_id)->orWhereNull('doctor_id');
            });

        $current = (clone $base)->where('doctor_id', $doctor->doctor_id)->where('status', 'called')
            ->orderBy('called_time', 'desc')->first();
        $queue = (clone $base)->where('status', 'waiting')->orderBy('token_number')->limit(10)->get();
        $today = (clone $base)->whereDate('check_in_time', now()->toDateString());

        return response()->json([
            'doctor' => [
                'id' => $doctor->doctor_id,
                'name' => $doctor->user ? $doctor->user->name : 'Dr. ' . $doctor->specialization,
                'specialization' => $doctor->specialization,
                'availability_status' => $doctor->availability_status ?? 'available',
                'avg_consult_min' => $doctor->avg_consult_min ?? 15,
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
                'patient' => $prescription->patient ? $prescription->patient->name : 'Patient',
                'issued_at' => $prescription->issued_at?->toIso8601String(),
            ]),
        ]);
    }

    public function callNext(Request $request)
    {
        $doctor = $this->doctorFor($request);
        if (!$doctor) {
            return response()->json(['message' => 'No active doctor profile found.'], 404);
        }

        $active = $this->activeToken($doctor);
        if ($active) {
            return response()->json(['message' => 'Complete or skip the current patient first.'], 409);
        }

        $token = QueueToken::where('clinic_id', $doctor->clinic_id)
            ->where('status', 'waiting')->orderBy('token_number')->first();

        if (!$token) {
            return response()->json(['message' => 'No waiting patients in queue.'], 404);
        }

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
        if (!$doctor) {
            return response()->json(['message' => 'Doctor profile not found.'], 404);
        }

        $status = $request->validate(['status' => ['required', 'in:skipped,completed,waiting,called']])['status'];
        $token->update([
            'status' => $status,
            'done_time' => $status === 'completed' ? now() : null,
        ]);

        return response()->json([
            'message' => 'Queue updated.',
            'current' => $status === 'called' ? $this->token($token->load('patient')) : null,
        ]);
    }

    private function doctorFor(Request $request): ?Doctor
    {
        $user = $request->user();
        if ($user) {
            $doc = $user->doctor()->with('user')->first();
            if ($doc) {
                return $doc;
            }
        }

        return Doctor::with('user')->orderBy('doctor_id')->first();
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
                'id' => $token->patient ? $token->patient->patient_id : null,
                'name' => $token->patient ? $token->patient->name : 'Walk-in Patient',
                'phone' => $token->patient ? $token->patient->phone : null,
                'dob' => $token->patient ? ($token->patient->date_of_birth ?? $token->patient->dob) : null,
            ],
            'check_in_time' => $token->check_in_time?->toIso8601String(),
            'called_time' => $token->called_time?->toIso8601String(),
            'est_wait_time' => $token->est_wait_time ?? 15,
        ];
    }
}
