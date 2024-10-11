<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'element_instance_id', 'status'];

    // Relación: Una evaluación pertenece a una instancia de elemento
    public function elementInstance()
    {
        return $this->belongsTo(ElementInstance::class);
    }


    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function element()
    {
        return $this->belongsTo(Element::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
}
