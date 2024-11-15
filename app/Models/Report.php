<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        "assessment_id",
        "final_score",
        "accessibility_level",
        "metrics_scores",
        "recommendations",
        "main_findings",
    ];

    protected $casts = [
        "metrics_scores" => "array",
        "recommendations" => "array",
        "main_findings" => "array",
    ];

    public function assessment()
    {
        return $this->belongsTo(Assessment::class);
    }
}
