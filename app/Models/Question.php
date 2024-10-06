<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    //faltan constantes para tipos

    public function element()
    {
        return $this->belongsTo(Element::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function expectedAnswer()
    {
        return $this->hasOne(ExpectedAnswer::class);
    }
    
    public function context()
    {
        return $this->hasOne(Context::class);
    }
}
