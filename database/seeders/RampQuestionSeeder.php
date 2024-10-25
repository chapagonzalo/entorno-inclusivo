<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Question;

class RampQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questions = [
            [
                'content' => '¿La rampa cumple con el ancho mínimo y máximo establecido?',
                'context' => 'El ancho de la rampa debe estar entre 0.90 metros y 1.20 metros, permitiendo el tránsito adecuado de personas con movilidad reducida, incluidas aquellas que utilizan sillas de ruedas.',
                'element_id' => 2
            ],
            [
                'content' => 'De acuerdo con la fórmula para calcular la pendiente y los cuadros de referencia, ¿la rampa cumple con la pendiente adecuada máxima de 8 %?',
                'context' => 'La pendiente de la rampa no debe exceder el 8%, para asegurar que sea accesible sin demasiado esfuerzo físico. Se calcula multiplicando la altura a salvar por el valor de relación (por ejemplo, 1/12.5).',
                'element_id' => 2
            ],
            [
                'content' => '¿La rampa cuenta con solado de prevención?',
                'context' => 'El solado de prevención, constituido por baldosas con relieves, es esencial para advertir a las personas, especialmente con discapacidad visual, sobre cambios o peligros en el camino.',
                'element_id' => 2
            ],
            [
                'content' => '¿El color del solado es contrastante?',
                'context' => 'El color del solado de prevención debe ser contrastante respecto al suelo circundante, lo que facilita su detección por parte de personas con discapacidad visual.',
                'element_id' => 2
            ],
            [
                'content' => '¿Cuenta con pasamanos?',
                'context' => 'Las rampas deben tener pasamanos dobles y continuos a ambos lados para que las personas puedan sujetarse, tanto al subir como al bajar.',
                'element_id' => 2
            ],
            [
                'content' => 'En caso de poseer pasamanos dobles, ¿cumple con las medidas establecidas?',
                'context' => 'Los pasamanos deben estar colocados a una altura de entre 0.75 y 0.90 metros y deben sobresalir entre 0.15 y 0.20 metros más allá del borde de la rampa.',
                'element_id' => 2
            ],
            [
                'content' => '¿Los laterales tienen algún tipo de contención?',
                'context' => 'Los laterales de la rampa deben contar con barreras de contención, como zócalos o muros, para evitar que sillas de ruedas o bastones se deslicen fuera de la rampa.',
                'element_id' => 2
            ],
            [
                'content' => '¿Si no tienen, cuenta con zócalo?',
                'context' => 'Si la rampa no tiene muros laterales, debe contar con un zócalo de al menos 0.10 metros de altura para impedir que las ruedas de las sillas de ruedas o bastones se deslicen fuera.',
                'element_id' => 2
            ],
            [
                'content' => '¿Hay descansos en las distancias correspondientes?',
                'context' => 'Las rampas deben contar con descansos cada 6 metros para permitir que las personas puedan detenerse y descansar si lo necesitan. El descanso debe tener un largo mínimo de 1.50 metros.',
                'element_id' => 2
            ],
            [
                'content' => '¿Permite giro de 90° a usuarios en silla de ruedas y ambulantes?',
                'context' => 'El descanso en la rampa debe permitir giros de 90° para que los usuarios en silla de ruedas o con movilidad reducida puedan cambiar de dirección cómodamente.',
                'element_id' => 2
            ],
            [
                'content' => '¿Permite giro de 180° a usuarios en silla de ruedas y ambulantes?',
                'context' => 'Si la rampa tiene varios tramos, debe contar con descansos que permitan realizar giros de 180°, brindando suficiente espacio para maniobrar.',
                'element_id' => 2
            ],
            [
                'content' => '¿Cumple con el largo mínimo?',
                'context' => 'El largo mínimo de la rampa depende de la altura que debe salvarse, y debe estar de acuerdo con la pendiente máxima permitida (8%).',
                'element_id' => 2
            ],
            [
                'content' => '¿Observa algún tipo de señalética accesible de rampa?',
                'context' => 'Las rampas deben estar señalizadas adecuadamente con pictogramas accesibles y, si es necesario, incluir información en Braille.',
                'element_id' => 2
            ],
            [
                'content' => '¿Según lo comprendido, observado y calculado; cuál es el estado de la rampa?',
                'context' => 'El estado de la rampa debe evaluarse como Bueno (B), Regular (R) o Malo (M), según cumpla con los criterios establecidos para accesibilidad.',
                'element_id' => 2
            ],
        ];

        foreach ($questions as $questionData) {
            Question::create($questionData);
        }
    }
}
