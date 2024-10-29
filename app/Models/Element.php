<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Element extends Model
{
    use HasFactory;
    protected $fillable = ["name"];

    // Relación: Un tipo de elemento tiene muchas instancias
    public function elementInstances()
    {
        return $this->hasMany(ElementInstance::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function metrics()
    {
        return $this->hasMany(Metric::class);
    }
}
