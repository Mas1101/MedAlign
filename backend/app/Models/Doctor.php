<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Doctor extends Model
{
    protected $table = 'doctors';
    protected $primaryKey = 'doctor_id';
    public $timestamps = false;

    protected $guarded = [];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function queueTokens(): HasMany
    {
        return $this->hasMany(QueueToken::class, 'doctor_id', 'doctor_id');
    }

    public function prescriptions(): HasMany
    {
        return $this->hasMany(Prescription::class, 'doctor_id', 'doctor_id');
    }
}
