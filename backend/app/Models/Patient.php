<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Patient extends Model
{
    protected $table = 'patients';
    protected $primaryKey = 'patient_id';
    public $timestamps = false;

    protected $guarded = [];

    protected $casts = [
        'dob' => 'date:Y-m-d',
    ];

    public function queueTokens(): HasMany
    {
        return $this->hasMany(QueueToken::class, 'patient_id', 'patient_id');
    }
}
