<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\QueueToken;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $planId = DB::table('subscription_plans')->insertGetId([
            'name' => 'Clinic Pro', 'price' => 149.00, 'billing_cycle' => 'monthly',
            'max_doctors' => 25, 'features' => 'Queue management, prescriptions, analytics',
        ]);

        $clinicId = DB::table('clinics')->insertGetId([
            'plan_id' => $planId, 'name' => 'MedAlign Health Centre',
            'address' => '24 Crescent Road', 'phone' => '+1 555 0100',
            'email' => 'hello@medalign.test', 'status' => 'active',
        ]);

        $user = User::create([
            'name' => 'Dr. Sarah Ahmed', 'email' => 'doctor@medalign.test',
            'password' => Hash::make('password'), 'role' => 'doctor', 'clinic_id' => $clinicId,
        ]);

        $doctor = Doctor::create([
            'user_id' => $user->id, 'clinic_id' => $clinicId,
            'specialization' => 'Cardiology', 'avg_consult_min' => 15,
            'availability_status' => 'available',
        ]);

        foreach ([
            ['Amina Yusuf', '+1 555 0101', '1988-04-12'],
            ['Michael Chen', '+1 555 0102', '1979-11-03'],
            ['Priya Nair', '+1 555 0103', '1994-07-28'],
            ['Jon Bell', '+1 555 0104', '1967-02-16'],
            ['Lina Gomez', '+1 555 0105', '1982-09-08'],
            ['Noah Williams', '+1 555 0106', '1990-01-21'],
        ] as $index => [$name, $phone, $dob]) {
            $patient = Patient::create(['name' => $name, 'phone' => $phone, 'dob' => $dob]);

            QueueToken::create([
                'clinic_id' => $clinicId, 'doctor_id' => $index === 0 ? $doctor->doctor_id : null,
                'patient_id' => $patient->patient_id, 'token_number' => 101 + $index,
                'status' => $index === 0 ? 'called' : 'waiting',
                'check_in_time' => now()->subMinutes(35 - ($index * 4)),
                'called_time' => $index === 0 ? now()->subMinutes(7) : null,
                'est_wait_time' => $index * 15,
            ]);
        }

    }
}
