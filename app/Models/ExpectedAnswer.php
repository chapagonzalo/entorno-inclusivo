<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpectedAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        "question_id",
        "expected_answer",
        "expected_answer_text",
        "expected_answer_enum",
        "expected_answer_numeric",
        "expected_answer_altura",
        "expected_answer_longitud",
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
