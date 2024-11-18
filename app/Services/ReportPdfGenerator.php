<?php

namespace App\Services;

use App\Models\Report;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportPdfGenerator
{
    public function generate(Report $report, $metrics)
    {
        $data = [
            "report" => $report->load([
                "assessment.elementInstance.location",
                "assessment.elementInstance.element",
                "assessment.user",
            ]),
            "metrics" => $metrics,
            "recommendations" => $report->recommendations ?? [],
        ];

        $pdf = PDF::loadView("report", $data);
        return $pdf;
    }
}
