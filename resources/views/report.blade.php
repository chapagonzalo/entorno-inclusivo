<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Informe de Evaluación</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.8;
                margin: 20px;
                color: #333333;
            }
            .header {
                text-align: center;
                margin-bottom: 40px;
                padding-bottom: 20px;
                border-bottom: 3px solid #444444;
            }
            .header h1 {
                color: #2b2d42;
                font-size: 28px;
                margin-bottom: 5px;
            }
            .header p {
                font-size: 14px;
                color: #4a5568;
            }
            .section {
                margin-bottom: 40px;
                page-break-before: always;
            }
            .header + .section {
                page-break-before: auto;
            }
            .section h2 {
                font-size: 22px;
                color: #2b2d42;
                border-bottom: 2px solid #888888;
                padding-bottom: 5px;
                margin-bottom: 20px;
            }
            .info-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 25px;
                font-size: 14px;
            }
            .info-table th, .info-table td {
                border: 1px solid #dddddd;
                padding: 12px;
            }
            .info-table th {
                background-color: #f3f4f6;
                font-weight: bold;
                color: #2d3748;
                width: 35%;
            }
            .score-section {
                text-align: center;
                padding: 25px;
                background-color: #e9f5ff;
                border-radius: 10px;
            }
            .final-score {
                font-size: 40px;
                font-weight: bold;
                color: #1a202c;
                margin-bottom: 5px;
            }
            .accessibility-level {
                font-size: 18px;
                color: #718096;
            }
            .metric {
                margin-bottom: 25px;
                padding: 20px;
                background-color: #f9fafb;
                border-left: 5px solid #3182ce;
                border-radius: 5px;
            }
            .metric h3 {
                font-size: 18px;
                color: #2b2d42;
                margin: 0;
                margin-bottom: 10px;
            }
            .metric-score {
                font-size: 16px;
                font-weight: bold;
                color: #4a5568;
                margin-bottom: 10px;
            }
            .recommendation {
                margin-bottom: 20px;
                padding: 20px;
                background-color: #fffaf0;
                border-left: 5px solid #d69e2e;
                border-radius: 5px;
            }
            .recommendation h3 {
                font-size: 18px;
                color: #9c4221;
                margin-top: 0;
            }
            .footer {
                text-align: center;
                color: #666666;
                font-size: 12px;
                margin-top: 40px;
                border-top: 1px solid #cccccc;
                padding-top: 10px;
            }
            .qa-block {
                margin-bottom: 15px;
                padding: 10px;
                background-color: #f7fafc;
                border-radius: 4px;
                border: 1px solid #e2e8f0;
            }
            .qa-block p {
                margin: 5px 0;
                font-size: 14px;
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
                <th>Descripción de elemento</th>
                <td>{{ $report->assessment->elementInstance->description}}</td>
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
                    <strong>Puntuación:</strong> {{ number_format($metric['score'], 1) }}%
                </div>
                <p><strong>Ponderación de la métrica:</strong> {{ $metric['weight'] }}%</p> <p>{{ $metric['description'] }}</p>


                <h4>Preguntas y Respuestas</h4>
                @foreach ($metric['questions'] as $qa)
                    <div class="qa-block">
                        <p><strong>Pregunta:</strong> {{ $qa['question'] }}</p>
                        <p><strong>Respuesta:</strong> {{ $qa['answer'] }}</p>
                        @if($qa['expected_answer'] != null)
                            <p><strong>Respuesta Esperada:</strong> {{ $qa['expected_answer'] }}</p>
                        @endif
                        @if($qa['answer_text'] != null)
                            <p><strong>Observación:</strong> {{ $qa['answer_text'] }}</p>
                        @endif
                        <p><strong>Ponderación de la pregunta:</strong> {{ $qa['weight'] }}%</p>
                        <p><strong>Puntuación:</strong> {{ $qa['score'] }}</p>

                    </div>
                    <hr>
                @endforeach
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
