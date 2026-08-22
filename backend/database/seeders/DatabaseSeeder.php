<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Subscription Plans
        $planId = DB::table('subscription_plans')->insertGetId([
            'name' => 'Clinic Pro',
            'price' => 149.00,
            'billing_cycle' => 'monthly',
            'max_doctors' => 25,
            'features' => 'Queue management, prescriptions, analytics',
        ]);

        // 2. Clinics
        $clinicId = DB::table('clinics')->insertGetId([
            'plan_id' => $planId,
            'name' => 'MedAlign Health Centre',
            'address' => '24 Crescent Road, Health District',
            'phone' => '+1 555 0100',
            'email' => 'hello@medalign.test',
            'status' => 'active',
        ]);

        // 3. Admin User
        User::firstOrCreate(
            ['email' => 'admin@medalign.test'],
            [
                'name' => 'Dr. Alexander Vance',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'clinic_id' => $clinicId,
                'email_verified_at' => now(),
            ]
        );

        // 4. Doctor User & Profile
        $doctorUser = User::firstOrCreate(
            ['email' => 'doctor@medalign.test'],
            [
                'name' => 'Dr. Sarah Ahmed',
                'password' => Hash::make('password'),
                'role' => 'doctor',
                'clinic_id' => $clinicId,
                'email_verified_at' => now(),
            ]
        );

        $doctor = Doctor::firstOrCreate(
            ['user_id' => $doctorUser->id],
            [
                'clinic_id' => $clinicId,
                'specialization' => 'Cardiology',
                'avg_consult_min' => 15,
                'availability_status' => 'available',
            ]
        );

        // 5. Counters
        $counterId = DB::table('counters')->insertGetId([
            'clinic_id' => $clinicId,
            'counter_number' => 1,
            'counter_name' => 'Room 101',
        ]);

        // 6. Patients & Queue Tokens
        $patientsData = [
            ['Amina Yusuf', '+1 555 0101', '1988-04-12', 'amina@test.org', 'Female'],
            ['Michael Chen', '+1 555 0102', '1979-11-03', 'michael@test.org', 'Male'],
            ['Priya Nair', '+1 555 0103', '1994-07-28', 'priya@test.org', 'Female'],
            ['Jon Bell', '+1 555 0104', '1967-02-16', 'jon@test.org', 'Male'],
            ['Lina Gomez', '+1 555 0105', '1982-09-08', 'lina@test.org', 'Female'],
            ['Noah Williams', '+1 555 0106', '1990-01-21', 'noah@test.org', 'Male'],
        ];

        foreach ($patientsData as $index => [$name, $phone, $dob, $email, $gender]) {
            $patient = Patient::firstOrCreate(
                ['phone' => $phone],
                [
                    'name' => $name,
                    'email' => $email,
                    'dob' => $dob,
                    'gender' => $gender,
                ]
            );

            $tokenId = DB::table('queue_tokens')->insertGetId([
                'clinic_id' => $clinicId,
                'doctor_id' => $index === 0 ? $doctor->doctor_id : null,
                'counter_id' => $counterId,
                'patient_id' => $patient->patient_id,
                'token_number' => 101 + $index,
                'status' => $index === 0 ? 'called' : ($index === 5 ? 'completed' : 'waiting'),
                'check_in_time' => now()->subMinutes(35 - ($index * 4)),
                'called_time' => $index === 0 ? now()->subMinutes(7) : null,
                'completed_time' => $index === 5 ? now()->subMinutes(2) : null,
                'est_wait_time' => $index * 15,
            ]);

            // Create prescription for completed patient
            if ($index === 5) {
                $rxId = DB::table('prescriptions')->insertGetId([
                    'token_id' => $tokenId,
                    'doctor_id' => $doctor->doctor_id,
                    'patient_id' => $patient->patient_id,
                    'notes' => 'Patient responded well to initial treatment. Keep hydrated and follow up in 2 weeks.',
                    'issued_at' => now()->subMinutes(2),
                ]);

                DB::table('prescription_items')->insert([
                    [
                        'prescription_id' => $rxId,
                        'medicine_name' => 'Amoxicillin 500mg',
                        'dosage' => '1 capsule',
                        'frequency' => '3 times daily',
                        'duration' => '7 days',
                        'instructions' => 'Take with water after meals',
                    ],
                    [
                        'prescription_id' => $rxId,
                        'medicine_name' => 'Paracetamol 500mg',
                        'dosage' => '1-2 tablets',
                        'frequency' => 'Every 6 hours if fever occurs',
                        'duration' => '3 days',
                        'instructions' => 'As needed',
                    ]
                ]);
            }
        }

        // 7. Daily Analytics Data (for Admin charts)
        for ($d = 6; $d >= 0; $d--) {
            DB::table('daily_analytics')->updateOrInsert(
                ['clinic_id' => $clinicId, 'date' => now()->subDays($d)->toDateString()],
                [
                    'total_patients' => 45 + rand(5, 25),
                    'avg_wait_time' => 12 + rand(0, 5),
                    'walkout_rate' => 2.1 + (rand(0, 20) / 10),
                ]
            );
        }
    }
}
