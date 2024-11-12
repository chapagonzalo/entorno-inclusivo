<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    const TYPE_TEXT = "text";
    const TYPE_ENUM_YESNO = "enum_yesno";
    const TYPE_ENUM_QUALITY = "enum_quality";

    // Medidas de longitud
    const TYPE_NUMERIC_WIDTH = "numeric_width";
    const TYPE_NUMERIC_HEIGHT = "numeric_height";
    const TYPE_NUMERIC_DEPTH = "numeric_depth";

    // Medidas de ángulos y pendientes
    const TYPE_NUMERIC_ANGLE = "numeric_angle";
    const TYPE_NUMERIC_SLOPE = "numeric_slope";

    // Medidas de área y espacio
    const TYPE_NUMERIC_AREA = "numeric_area";
    const TYPE_NUMERIC_DIAMETER = "numeric_diameter";

    // Medidas de fuerza e iluminación
    const TYPE_NUMERIC_FORCE = "numeric_force";
    const TYPE_NUMERIC_ILLUMINATION = "numeric_illumination";

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

    // Agregar las relaciones faltantes
    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function expectedAnswer()
    {
        return $this->hasOne(ExpectedAnswer::class);
    }

    public function element()
    {
        return $this->belongsTo(Element::class);
    }

    public function metrics()
    {
        return $this->belongsToMany(Metric::class)->withPivot(
            "question_weight"
        );
    }
}
