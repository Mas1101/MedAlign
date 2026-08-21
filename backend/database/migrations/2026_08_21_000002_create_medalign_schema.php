<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscription_plans', function (Blueprint $table) {
            $table->id('plan_id');
            $table->string('name', 30);
            $table->decimal('price', 8, 2);
            $table->string('billing_cycle', 20);
            $table->unsignedInteger('max_doctors');
            $table->text('features')->nullable();
        });

        Schema::create('clinics', function (Blueprint $table) {
            $table->id('clinic_id');
            $table->foreignId('plan_id')->constrained('subscription_plans', 'plan_id')->restrictOnDelete();
            $table->string('name', 100);
            $table->string('address', 200);
            $table->string('phone', 20);
            $table->string('email', 100);
            $table->string('status', 20)->default('active');
            $table->timestamp('created_at')->useCurrent();
        });

        Schema::create('invoices', function (Blueprint $table) {
            $table->id('invoice_id');
            $table->foreignId('clinic_id')->constrained('clinics', 'clinic_id')->cascadeOnDelete();
            $table->foreignId('plan_id')->constrained('subscription_plans', 'plan_id')->restrictOnDelete();
            $table->decimal('amount', 8, 2);
            $table->string('status', 20)->default('pending');
            $table->date('issued_date');
            $table->date('due_date');
        });

        Schema::create('daily_analytics', function (Blueprint $table) {
            $table->id('stat_id');
            $table->foreignId('clinic_id')->constrained('clinics', 'clinic_id')->cascadeOnDelete();
            $table->date('date');
            $table->unsignedInteger('avg_wait_time')->default(0);
            $table->unsignedInteger('total_patients')->default(0);
            $table->decimal('walkout_rate', 5, 2)->default(0);
            $table->unique(['clinic_id', 'date']);
        });

        Schema::create('counters', function (Blueprint $table) {
            $table->id('counter_id');
            $table->foreignId('clinic_id')->constrained('clinics', 'clinic_id')->cascadeOnDelete();
            $table->unsignedInteger('counter_number');
            $table->string('counter_name', 30);
            $table->unique(['clinic_id', 'counter_number']);
        });

        Schema::create('doctors', function (Blueprint $table) {
            $table->id('doctor_id');
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('clinic_id')->constrained('clinics', 'clinic_id')->cascadeOnDelete();
            $table->string('specialization', 50);
            $table->unsignedInteger('avg_consult_min')->default(15);
            $table->string('availability_status', 20)->default('available');
            $table->unique('user_id');
        });

        Schema::create('doctor_schedules', function (Blueprint $table) {
            $table->id('schedule_id');
            $table->foreignId('doctor_id')->constrained('doctors', 'doctor_id')->cascadeOnDelete();
            $table->string('day_of_week', 10);
            $table->time('start_time');
            $table->time('end_time');
            $table->unique(['doctor_id', 'day_of_week', 'start_time']);
        });

        Schema::create('patients', function (Blueprint $table) {
            $table->id('patient_id');
            $table->string('name', 100);
            $table->string('phone', 20);
            $table->string('email', 100)->nullable();
            $table->date('dob')->nullable();
            $table->string('gender', 10)->nullable();
            $table->timestamp('created_at')->useCurrent();
        });

        Schema::create('queue_tokens', function (Blueprint $table) {
            $table->id('token_id');
            $table->foreignId('clinic_id')->constrained('clinics', 'clinic_id')->cascadeOnDelete();
            $table->foreignId('doctor_id')->nullable()->constrained('doctors', 'doctor_id')->nullOnDelete();
            $table->foreignId('patient_id')->constrained('patients', 'patient_id')->cascadeOnDelete();
            $table->foreignId('counter_id')->nullable()->constrained('counters', 'counter_id')->nullOnDelete();
            $table->unsignedInteger('token_number');
            $table->string('status', 20)->default('waiting');
            $table->timestamp('check_in_time')->nullable();
            $table->timestamp('called_time')->nullable();
            $table->timestamp('completed_time')->nullable();
            $table->unsignedInteger('est_wait_time')->nullable();
            $table->unique(['clinic_id', 'token_number']);
        });

        Schema::create('prescription_templates', function (Blueprint $table) {
            $table->id('template_id');
            $table->foreignId('doctor_id')->constrained('doctors', 'doctor_id')->cascadeOnDelete();
            $table->string('name', 100);
            $table->timestamp('created_at')->useCurrent();
        });

        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id('prescription_id');
            $table->foreignId('token_id')->nullable()->constrained('queue_tokens', 'token_id')->nullOnDelete();
            $table->foreignId('doctor_id')->constrained('doctors', 'doctor_id')->restrictOnDelete();
            $table->foreignId('patient_id')->constrained('patients', 'patient_id')->cascadeOnDelete();
            $table->foreignId('template_id')->nullable()->constrained('prescription_templates', 'template_id')->nullOnDelete();
            $table->text('notes')->nullable();
            $table->string('qr_code_path', 255)->nullable();
            $table->string('pdf_path', 255)->nullable();
            $table->timestamp('issued_at')->useCurrent();
        });

        Schema::create('prescription_items', function (Blueprint $table) {
            $table->id('item_id');
            $table->foreignId('prescription_id')->constrained('prescriptions', 'prescription_id')->cascadeOnDelete();
            $table->string('medicine_name', 100);
            $table->string('dosage', 50);
            $table->string('frequency', 50);
            $table->string('duration', 50);
            $table->text('instructions')->nullable();
        });

        Schema::create('alert_preferences', function (Blueprint $table) {
            $table->id('preference_id');
            $table->foreignId('patient_id')->constrained('patients', 'patient_id')->cascadeOnDelete();
            $table->boolean('sms_enabled')->default(false);
            $table->boolean('whatsapp_enabled')->default(false);
            $table->unsignedInteger('near_turn_threshold')->default(3);
            $table->unique('patient_id');
        });
    }

    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        foreach ([
            'alert_preferences',
            'prescription_items',
            'prescriptions',
            'prescription_templates',
            'queue_tokens',
            'patients',
            'doctor_schedules',
            'doctors',
            'counters',
            'daily_analytics',
            'invoices',
            'clinics',
            'subscription_plans',
        ] as $table) {
            Schema::dropIfExists($table);
        }
        Schema::enableForeignKeyConstraints();
    }
};