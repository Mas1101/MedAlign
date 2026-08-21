<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QueueToken extends Model
{
    protected $table = 'queue_tokens';
    protected $primaryKey = 'token_id';
    public $timestamps = false;

    protected $guarded = [];

    protected $casts = [
        'check_in_time' => 'datetime',
        'called_time' => 'datetime',
        'completed_time' => 'datetime',
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class, 'patient_id', 'patient_id');
    }

    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Doctor::class, 'doctor_id', 'doctor_id');
    }
}
