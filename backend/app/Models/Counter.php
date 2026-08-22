<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Counter extends Model
{
    protected $primaryKey = 'counter_id';
    public $timestamps = false;

    protected $fillable = [
        'clinic_id',
        'counter_label',
        'is_active',
    ];

    public function clinic()
    {
        return $this->belongsTo(Clinic::class, 'clinic_id', 'clinic_id');
    }

    public function queueTokens()
    {
        return $this->hasMany(QueueToken::class, 'counter_id', 'counter_id');
    }
}
