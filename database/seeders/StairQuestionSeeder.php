<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Question;

class StairQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questions = [
            [
                "content" =>
                    "¿El tramo de escalera cumple con la cantidad de alzadas corridas entre descansos?",
                "context" =>
                    "Las escaleras no deben tener más de 12 alzadas corridas entre descansos. Esto es importante para asegurar la seguridad y permitir descansos adecuados en recorridos largos.",
                "element_id" => 1,
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" => "¿La escalera cumple con el ancho libre?",
                "context" =>
                    "El ancho mínimo entre los zócalos debe ser de 1.20 metros para garantizar que las personas, incluidas aquellas con movilidad reducida o en silla de ruedas, puedan utilizarla cómodamente. En lotes más pequeños (8.66 metros o menos de ancho), este puede reducirse a 1.10 metros.",
                "element_id" => 1,
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿Los escalones de la escalera son iguales entre sí?",
                "context" =>
                    "Todos los escalones de la escalera deben ser de la misma altura y profundidad, asegurando un patrón de movimiento uniforme y reduciendo el riesgo de accidentes.",
                "element_id" => 1,
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿Los escalones de escalera cumplen con el ancho mínimo y máximo de pedada y alzada?",
                "context" =>
                    "La altura de los escalones (alzada) debe estar entre 0.15 metros y 0.18 metros, mientras que la profundidad de la huella (pedada) debe estar entre 0.26 metros y 0.30 metros para facilitar el desplazamiento seguro y cómodo.",
                "element_id" => 1,
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" =>
                    "Si la escalera cuenta con un descanso, ¿cumple con el ancho mínimo establecido?",
                "context" =>
                    "Los descansos deben tener una profundidad mínima de dos tercios del ancho de la escalera, o al menos 1.25 metros si hay giros de 90° o 180°. Si es un tramo recto sin giros, el mínimo es de 0.95 metros.",
                "element_id" => 1,
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La escalera cuenta con pasamanos en ambos lados?",
                "context" =>
                    "Es esencial que las escaleras tengan pasamanos en ambos lados para ofrecer apoyo tanto a personas diestras como zurdas, mejorando la seguridad tanto en subida como en bajada.",
                "element_id" => 1,
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿Los pasamanos cumplen con las medidas establecidas?",
                "context" =>
                    "Los pasamanos deben estar a una altura de 0.90 metros desde la nariz del escalón hasta el plano superior del pasamanos. Además, deben tener un diámetro mínimo de 0.04 metros para facilitar su agarre.",
                "element_id" => 1,
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿Si los pasamanos cuentan con extensión horizontal esta cuenta con las medidas establecidas?",
                "context" =>
                    "Los pasamanos deben extenderse horizontalmente antes y después del tramo de escalones por una longitud mínima de 0.15 metros y un máximo de 0.40 metros para mejorar la accesibilidad.",
                "element_id" => 1,
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" => "¿Los pasamanos cumplen con la longitud total?",
                "context" =>
                    "La longitud total de los pasamanos debe abarcar todo el recorrido de la escalera, incluyendo la extensión en los descansos cuando sea necesario, para ofrecer apoyo continuo.",
                "element_id" => 1,
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" => "¿La escalera cuenta con zócalos?",
                "context" =>
                    "Si uno o ambos lados de la escalera no tienen una contención lateral, deben incluir zócalos de al menos 0.10 metros de altura para evitar que bastones o sillas de ruedas se deslicen hacia fuera.",
                "element_id" => 1,
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿Los zócalos cumplen con las medidas establecidas?",
                "context" =>
                    "Los zócalos deben tener una altura mínima de 0.10 metros, cumpliendo con las normativas de seguridad.",
                "element_id" => 1,
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" => "¿La escalera cuenta con solado de prevención?",
                "context" =>
                    "El solado de prevención, formado por baldosas con relieves y colores contrastantes, es clave para advertir a personas con discapacidad visual sobre la presencia de escaleras y posibles peligros.",
                "element_id" => 1,
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿Si la escalera es suspendida cumple con las medidas establecidas para este tipo de acceso?",
                "context" =>
                    "Las escaleras suspendidas deben estar señalizadas con un solado contrastante y botones de relieve que sobresalgan 0.60 metros más allá de los bordes laterales para impedir el paso y advertir de la escalera.",
                "element_id" => 1,
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿Observa algún tipo de señalética accesible de escalera?",
                "context" =>
                    "Las escaleras deben estar señalizadas de manera adecuada con pictogramas accesibles y, si es necesario, incluir información en Braille.",
                "element_id" => 1,
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" =>
                    "Según lo comprendido, observado y calculado; ¿cuál es el estado de la escalera?",
                "context" =>
                    "El estado de la escalera debe evaluarse como Bueno (B), Regular (R) o Malo (M), según cumpla con los criterios de accesibilidad establecidos.",
                "element_id" => 1,
                "answer_types" => ["text", "enum_quality"],
            ],
        ];

        // Insertar preguntas y contextos en la base de datos
        foreach ($questions as $questionData) {
            Question::create($questionData);
        }
    }
}
