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
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
