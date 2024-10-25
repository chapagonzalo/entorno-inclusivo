<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Question;

class DoorQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questions = [
            [
                'content' => '¿La puerta cumple con el ancho mínimo establecido?',
                'context' => 'Las puertas deben tener un ancho suficiente para permitir el paso de personas con movilidad reducida, incluidas aquellas que utilizan sillas de ruedas. El ancho mínimo recomendado es de 0.80 metros.',
                'element_id' => 4
            ],
            [
                'content' => '¿La puerta cuenta con el ángulo de apertura establecido?',
                'context' => 'Las puertas deben abrirse al menos 90° para facilitar el acceso. Esto es especialmente importante para asegurar que las personas puedan entrar y salir sin dificultad.',
                'element_id' => 4
            ],
            [
                'content' => '¿La puerta cuenta con mecanismo de apertura?',
                'context' => 'Las puertas deben contar con un mecanismo de apertura que sea fácil de usar para todas las personas, incluidos aquellos con limitaciones de fuerza. Esto puede incluir manijas o pomos que no requieran girar la muñeca.',
                'element_id' => 4
            ],
            [
                'content' => '¿El herraje de apertura cuenta con las medidas establecidas?',
                'context' => 'Los herrajes deben estar ubicados a una altura accesible (generalmente entre 0.80 m y 1.20 m desde el suelo) para que todas las personas puedan alcanzarlos y utilizarlos sin dificultad.',
                'element_id' => 4
            ],
            [
                'content' => '¿La puerta cuenta con herrajes de retención?',
                'context' => 'Las puertas de dos o más hojas deben tener pasadores que se puedan accionar desde una altura accesible para garantizar que puedan mantenerse abiertas cuando sea necesario.',
                'element_id' => 4
            ],
            [
                'content' => '¿Los herrajes de retención cumplen con las medidas mínimas y máximas establecidas?',
                'context' => 'Es importante que los herrajes de retención estén dentro de las dimensiones específicas establecidas para asegurar que sean utilizables por todas las personas, incluidas aquellas con discapacidades.',
                'element_id' => 4
            ],
            [
                'content' => '¿El cerrojo de seguridad cumple con lo establecido?',
                'context' => 'Los cerrojos deben ser de fácil acceso y deben poder accionarse desde el interior en caso de emergencia, evitando el uso de cerraduras con llaves que podrían complicar la salida rápida.',
                'element_id' => 4
            ],
            [
                'content' => '¿La puerta cuenta con herrajes suplementarios?',
                'context' => 'Los herrajes suplementarios son aquellos que facilitan el uso de la puerta por personas de diferentes alturas. Deben estar colocados de manera que todos los usuarios puedan acceder a ellos.',
                'element_id' => 4
            ],
            [
                'content' => '¿Los herrajes suplementarios cuentan con las medidas establecidas?',
                'context' => 'Estos herrajes deben cumplir con las dimensiones adecuadas para ser accesibles y utilizables por todos, garantizando la funcionalidad de la puerta.',
                'element_id' => 4
            ],
            [
                'content' => '¿Observa algún tipo de señalética accesible de puerta?',
                'context' => 'Es esencial que las puertas cuenten con señalización adecuada que indique su función y acceso, utilizando pictogramas y, si es necesario, información en Braille.',
                'element_id' => 4
            ],
            [
                'content' => 'Según lo comprendido, observado y calculado; ¿cuál es el estado de la puerta?',
                'context' => 'El estado de la puerta debe evaluarse como Bueno (B), Regular (R) o Malo (M), basándose en si cumple con los criterios de accesibilidad establecidos.',
                'element_id' => 4
            ],
        ];

        // Insertar preguntas y contextos en la base de datos
        foreach ($questions as $questionData) {
            Question::create($questionData);
        }
    }
}
