<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Question;

class BathroomQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questions = [
            [
                'content' => '¿El baño cumple con las dimensiones mínimas establecidas?',
                'context' => 'Es esencial que el baño tenga un espacio adecuado (mínimo de 1.5 metros cuadrados) para permitir la maniobra de una silla de ruedas, garantizando que todas las personas puedan utilizarlo sin restricciones.',
                'element_id' => 5
            ],
            [
                'content' => '¿El inodoro cumple con las medidas mínimas de aproximación establecidas?',
                'context' => 'Debe haber suficiente espacio lateral (0.80 metros) y frontal (0.90 metros) alrededor del inodoro para facilitar la transferencia desde una silla de ruedas, asegurando un acceso cómodo y seguro.',
                'element_id' => 5
            ],
            [
                'content' => '¿El baño cumple con la medida mínima de altura de taza de inodoro?',
                'context' => 'La altura de la taza del inodoro debe estar entre 0.50 y 0.52 metros desde el nivel del suelo para facilitar el uso por personas con diferentes capacidades físicas.',
                'element_id' => 5
            ],
            [
                'content' => '¿El baño cuenta con barras de apoyo y transferencia?',
                'context' => 'Las barras de apoyo son esenciales para ayudar a las personas a levantarse y sentarse en el inodoro. Deben estar fijadas firmemente y ubicarse a una altura accesible (0.75 m a 0.80 m).',
                'element_id' => 5
            ],
            [
                'content' => '¿Las barras de apoyo y transferencia cuentan con las medidas establecidas?',
                'context' => 'Las barras deben cumplir con las dimensiones específicas para asegurar su eficacia y seguridad, sobrepasando el borde del inodoro para brindar apoyo adicional.',
                'element_id' => 5
            ],
            [
                'content' => '¿El baño cuenta con bacha o mesada?',
                'context' => 'Es importante que el baño tenga un lavabo accesible, que debe estar colocado a una altura adecuada para permitir su uso desde una silla de ruedas.',
                'element_id' => 5
            ],
            [
                'content' => '¿La bacha o mesada cumple con las medidas establecidas?',
                'context' => 'La bacha debe tener dimensiones que permitan su uso cómodo por personas con diferentes capacidades, asegurando que se pueda acceder sin obstáculos.',
                'element_id' => 5
            ],
            [
                'content' => '¿La bacha o mesada cumple con las medidas de superficie mínima de aproximación?',
                'context' => 'Debe haber suficiente espacio frente al lavabo (1.00 metro de profundidad) y a los lados (0.40 metros) para permitir el acceso y la utilización del mismo.',
                'element_id' => 5
            ],
            [
                'content' => '¿La bacha o mesada cuenta con acceso libre?',
                'context' => 'El área debajo del lavabo no debe tener muebles o estructuras que impidan el acercamiento de una silla de ruedas, garantizando así un acceso total.',
                'element_id' => 5
            ],
            [
                'content' => '¿El baño cuenta con espejo?',
                'context' => 'Los espejos deben estar instalados a una altura que permita su uso desde una silla de ruedas, facilitando la visibilidad sin necesidad de ajustar la posición.',
                'element_id' => 5
            ],
            [
                'content' => '¿El espejo cumple con las medidas establecidas?',
                'context' => 'Debe cumplir con las dimensiones adecuadas y estar diseñado para facilitar el uso por personas con diversas capacidades, asegurando que sea funcional.',
                'element_id' => 5
            ],
            [
                'content' => '¿La grifería cumple con lo establecido?',
                'context' => 'La grifería debe ser de fácil acceso y operar de manera simple (por ejemplo, tipo palanca) para que todas las personas puedan usarla sin dificultad.',
                'element_id' => 5
            ],
            [
                'content' => '¿El pulsador sanitario de emergencia cumple con las medidas establecidas?',
                'context' => 'Debe estar colocado a una altura accesible (entre 0.40 m y 0.50 m) y ser fácil de usar en caso de necesidad urgente.',
                'element_id' => 5
            ],
            [
                'content' => 'El baño en caso de contar con ducha, ¿cumple con las medidas establecidas?',
                'context' => 'La ducha debe tener suficiente espacio y un diseño accesible (0.90 m x 0.90 m) para facilitar su uso por personas con discapacidades.',
                'element_id' => 5
            ],
            [
                'content' => '¿El baño cuenta con accesorios?',
                'context' => 'Los accesorios del baño (como toalleros y llaves de luz) deben estar ubicados en posiciones accesibles, dentro del alcance de las personas en silla de ruedas.',
                'element_id' => 5
            ],
            [
                'content' => '¿Los accesorios de baño cumplen con las medidas establecidas?',
                'context' => 'Deben estar situados a una altura que permita su uso sin dificultad, asegurando que sean accesibles para todos los usuarios.',
                'element_id' => 5
            ],
            [
                'content' => '¿Observa algún tipo de señalética accesible de baño?',
                'context' => 'La señalética en el baño debe ser clara y accesible, utilizando pictogramas y, si es necesario, información en Braille para facilitar la comprensión.',
                'element_id' => 5
            ],
            [
                'content' => '¿La señalética accesible cuenta con las medidas establecidas?',
                'context' => 'La señalética debe cumplir con las dimensiones adecuadas para ser legible y comprensible, asegurando su efectividad para todas las personas.',
                'element_id' => 5
            ],
            [
                'content' => 'Según lo comprendido, observado y calculado; ¿cuál es el estado del baño?',
                'context' => 'El estado del baño debe evaluarse como Bueno (B), Regular (R) o Malo (M), dependiendo de si cumple o no con los criterios de accesibilidad establecidos.',
                'element_id' => 5
            ],
        ];

        // Insertar preguntas y contextos en la base de datos
        foreach ($questions as $questionData) {
            Question::create($questionData);
        }
    }
}
