<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;
    protected $fillable = [
        "assessment_id",
        "question_id",
        "content",
        "answer_text",
        "answer_enum",
        "answer_numeric",
        "altura",
        "longitud",
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function assessment()
    {
        return $this->belongsTo(Assessment::class);
    }
}
