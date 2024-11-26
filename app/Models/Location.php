<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = ["name"];

    // Relación: Una ubicación tiene muchas instancias de elementos
    public function elementInstances()
    {
        return $this->hasMany(ElementInstance::class);
    }

    public function elements()
    {
        return $this->hasMany(Element::class);
    }
}
