<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ElementInstance extends Model
{
    use HasFactory;

    protected $fillable = ["location_id", "element_id", "description"];

    // Relación: Una instancia de elemento pertenece a una ubicación
    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    // Relación: Una instancia de elemento pertenece a un tipo de elemento
    public function element()
    {
        return $this->belongsTo(Element::class);
    }

    // Relación: Una instancia de elemento puede tener muchas evaluaciones
    public function assessments()
    {
        return $this->hasMany(Assessment::class);
    }
}
