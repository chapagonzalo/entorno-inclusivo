<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Informe de Evaluación</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #eaeaea;
        }
        .header h1 {
            color: #2d3748;
            margin-bottom: 10px;
        }
        .section {
            margin-bottom: 30px;
        }
        .section h2 {
            color: #2d3748;
            border-bottom: 1px solid #eaeaea;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .info-table th, .info-table td {
            border: 1px solid #e2e8f0;
            padding: 10px;
            text-align: left;
        }
        .info-table th {
            background-color: #f7fafc;
            font-weight: bold;
            width: 30%;
        }
        .score-section {
            text-align: center;
            margin: 20px 0;
            padding: 20px;
            background-color: #f7fafc;
            border-radius: 8px;
        }
        .final-score {
            font-size: 36px;
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 10px;
        }
        .accessibility-level {
            font-size: 18px;
            color: #4a5568;
        }
        .metric {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f8fafc;
            border-radius: 4px;
        }
        .metric h3 {
            color: #2d3748;
            margin-top: 0;
            margin-bottom: 10px;
        }
        .metric-score {
            font-weight: bold;
            color: #4a5568;
            margin-bottom: 5px;
        }
        .recommendation {
            margin-bottom: 15px;
            padding: 15px;
            background-color: #fffbeb;
            border-radius: 4px;
        }
        .recommendation h3 {
            color: #92400e;
            margin-top: 0;
            margin-bottom: 10px;
        }
        .page-break {
            page-break-before: always;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Informe de Evaluación de Accesibilidad</h1>
        <p>Fecha: {{ date('d/m/Y', strtotime($report->created_at)) }}</p>
    </div>

    <div class="section">
        <h2>Información General</h2>
        <table class="info-table">
            <tr>
                <th>Ubicación</th>
                <td>{{ $report->assessment->elementInstance->location->name }}</td>
            </tr>
            <tr>
                <th>Elemento</th>
                <td>{{ $report->assessment->elementInstance->element->name }}</td>
            </tr>
            <tr>
                <th>Evaluador</th>
                <td>{{ $report->assessment->user->name }}</td>
            </tr>
            <tr>
                <th>Fecha de Evaluación</th>
                <td>{{ date('d/m/Y', strtotime($report->assessment->created_at)) }}</td>
            </tr>
        </table>
    </div>

    <div class="section">
        <div class="score-section">
            <div class="final-score">
                {{ number_format($report->final_score, 1) }}%
            </div>
            <div class="accessibility-level">
                Nivel de Accesibilidad: {{ $report->accessibility_level }}
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Métricas Detalladas</h2>
        @foreach($metrics as $metric)
            <div class="metric">
                <h3>{{ $metric['name'] }}</h3>
                <div class="metric-score">
                    Puntuación: {{ number_format($metric['score'], 1) }}%
                </div>
                <p>{{ $metric['description'] }}</p>
            </div>
        @endforeach
    </div>

    @if(!empty($recommendations))
        <div class="section">
            <h2>Recomendaciones</h2>
            @foreach($recommendations as $recommendation)
                <div class="recommendation">
                    <h3>{{ $recommendation['area'] }}</h3>
                    <p>{{ $recommendation['suggestion'] }}</p>
                </div>
            @endforeach
        </div>
    @endif

    <div class="footer">
        <p style="text-align: center; color: #718096; font-size: 12px;">
            © {{ date('Y') }} Sistema de Evaluación de Accesibilidad
        </p>
    </div>
</body>
</html>
