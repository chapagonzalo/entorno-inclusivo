<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Question;

class SignageQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questions = [
            [
                'content' => '¿En el edificio hay señalética accesible?',
                'context' => 'La señalética accesible es aquella que permite a personas con discapacidades orientarse, comunicarse y moverse por el entorno de manera autónoma, utilizando pictogramas, textos, símbolos y otros elementos que son perceptibles tanto para personas sin discapacidad como para aquellas con discapacidades sensoriales o de movilidad.',
                'element_id' => 3
            ],
            [
                'content' => '¿La señalética posee el símbolo internacional de accesibilidad?',
                'context' => 'El símbolo internacional de accesibilidad representa la independencia y participación activa de las personas con discapacidad. Este símbolo debe estar presente en la señalética para indicar accesibilidad.',
                'element_id' => 3
            ],
            [
                'content' => '¿La señalética tiene una buena iluminación?',
                'context' => 'Es fundamental que la señalética esté bien iluminada para garantizar su visibilidad a todas horas, lo que facilita su lectura y comprensión, especialmente para personas con baja visión.',
                'element_id' => 3
            ],
            [
                'text' => '¿La señalética se encuentra libre de obstáculos?',
                'context' => 'La señalética debe estar colocada en lugares donde no existan objetos o barreras que impidan su visibilidad o acceso, lo que facilita que las personas con movilidad reducida o discapacidades sensoriales puedan usarla.',
                'element_id' => 3
            ],
            [
                'text' => '¿La tipografía utilizada es legible?',
                'context' => 'La legibilidad de la tipografía es clave, recomendándose el uso de fuentes como Sans Serif y evitar abreviaciones o frases complejas para facilitar la lectura rápida y clara.',
                'element_id' => 3
            ],
            [
                'text' => '¿Se encuentra protegida con cristal o algún otro elemento?',
                'context' => 'Se debe evitar proteger la señalética con cristales u otros elementos que puedan reflejar luz o dificultar su visibilidad y comprensión.',
                'element_id' => 3
            ],
            [
                'text' => '¿El edificio posee señalética en sistema Braille?',
                'context' => 'El sistema Braille es esencial para personas con discapacidad visual, permitiendo la lectura táctil de la información en la señalética.',
                'element_id' => 3
            ],
            [
                'text' => '¿El edificio posee plano háptico?',
                'context' => 'Los planos hápticos son representaciones táctiles del entorno que permiten a las personas, especialmente con discapacidad visual, orientarse y conocer la distribución del espacio.',
                'element_id' => 3
            ],
            [
                'text' => '¿El plano háptico se encuentra próximo al ingreso del edificio?',
                'context' => 'Es importante que el plano háptico esté ubicado cerca del ingreso del edificio para que sea accesible desde el momento en que la persona entra al lugar.',
                'element_id' => 3
            ],
            [
                'text' => '¿Posee intérprete de señas?',
                'context' => 'La presencia de intérpretes de lengua de señas asegura la accesibilidad para personas con discapacidad auditiva, facilitando la comunicación.',
                'element_id' => 3
            ],
            [
                'text' => '¿El edificio cuenta con formatos audiovisuales?',
                'context' => 'Los formatos audiovisuales accesibles incluyen subtitulado, audio descripción y locución, lo que permite a personas con discapacidades sensoriales acceder a la información de manera inclusiva.',
                'element_id' => 3
            ],
            [
                'text' => '¿El edificio posee señales audibles?',
                'context' => 'Las señales audibles son importantes para personas con discapacidad visual, permitiendo que la información visual sea replicada mediante sonido, como anuncios por megafonía.',
                'element_id' => 3
            ],
            [
                'text' => '¿El audio contiene descripción y/o locución?',
                'context' => 'La audio descripción y locución proporcionan detalles adicionales sobre el entorno o eventos importantes para personas con discapacidad visual.',
                'element_id' => 3
            ],
            [
                'text' => '¿El edificio cuenta con asistencia humana en caso de ser necesario?',
                'context' => 'La asistencia humana puede ser proporcionada mediante guías, intérpretes o personal de apoyo que ayuden a las personas con discapacidades a moverse por el edificio o acceder a servicios.',
                'element_id' => 3
            ],
            [
                'text' => '¿Según lo comprendido, observado y calculado; cuál es el estado de la señalética?',
                'context' => 'El estado de la señalética se debe evaluar como Bueno (B), Regular (R) o Malo (M), considerando si cumple o no con los estándares de accesibilidad descritos.',
                'element_id' => 3
            ],
        ];

        // Crear cada pregunta con su contexto
        foreach ($questions as $questionData) {
            Question::create($questionData);
        }
    }
}
