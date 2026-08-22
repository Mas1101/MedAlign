<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $primaryKey = 'doctor_id';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'clinic_id',
        'specialization',
        'license_number',
        'avg_consult_min',
        'availability_status',
        'is_active',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function clinic()
    {
        return $this->belongsTo(Clinic::class, 'clinic_id', 'clinic_id');
    }

    public function queueTokens()
    {
        return $this->hasMany(QueueToken::class, 'doctor_id', 'doctor_id');
    }

    public function prescriptions()
    {
        return $this->hasMany(Prescription::class, 'doctor_id', 'doctor_id');
    }
}
