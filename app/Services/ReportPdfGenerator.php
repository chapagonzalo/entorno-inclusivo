<?php

namespace App\Services;

use App\Models\Report;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportPdfGenerator
{
    public function generate(Report $report)
    {
        $report->load([
            "assessment.elementInstance.location",
            "assessment.elementInstance.element",
            "assessment.user",
        ]);

        $pdf = Pdf::loadView("report", [
            "report" => $report,
            "metrics" => $report->metrics_scores,
            "recommendations" => $report->recommendations,
        ]);

        $pdf->setPaper("a4");
        $pdf->setOptions([
            "isHtml5ParserEnabled" => true,
            "isRemoteEnabled" => true,
            "defaultFont" => "DejaVu Sans",
        ]);

        return $pdf;
    }
}
