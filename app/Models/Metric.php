<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Metric extends Model
{
    use HasFactory;

    protected $fillable = ["element_id", "name", "description", "weight"];

    public function element()
    {
        return $this->belongsTo(Element::class);
    }

    public function questions()
    {
        return $this->belongsToMany(Question::class)->withPivot(
            "question_weight"
        );
    }
}
