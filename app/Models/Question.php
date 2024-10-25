<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    //faltan constantes para tipos

    const TYPE_TEXT = "text";
    const TYPE_ENUM_YESNO = "enum_yesno";
    const TYPE_ENUM_QUALITY = "enum_quality";
    const TYPE_NUMERIC = "numeric";

    protected $fillable = ["content", "context", "element_id", "answer_types"];

    protected $casts = [
        "answer_types" => "array",
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($question) {
            if (empty($question->answer_types)) {
                $question->answer_types = [self::TYPE_TEXT];
            }
        });
    }
}
