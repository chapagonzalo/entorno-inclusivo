<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Question;

class QuestionSeeder extends Seeder
{
    /**
     * Elementos y sus IDs
     */
    private const ELEMENTS = [
        "stairs" => 1,
        "ramps" => 2,
        "signage" => 3,
        "doors" => 4,
        "bathrooms" => 5,
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        try {
            foreach (self::ELEMENTS as $element => $id) {
                $methodName = "create" . ucfirst($element) . "Questions";
                if (method_exists($this, $methodName)) {
                    $this->$methodName();
                    $this->command->info(
                        "Questions for {$element} created successfully."
                    );
                }
            }
        } catch (Exception $e) {
            Log::error("Error seeding questions: " . $e->getMessage());
            $this->command->error(
                "Error seeding questions: " . $e->getMessage()
            );
        }
    }

    /**
     * Create questions for a specific set of data
     */
    private function createQuestions($questions): void
    {
        foreach ($questions as $questionData) {
            Question::create($questionData);
        }
    }

    private function createStairsQuestions(): void
    {
        $questions = [
            [
                "content" =>
                    "¿El tramo de escalera cumple con la cantidad de alzadas corridas entre descansos?",
                "context" =>
                    "Las escaleras no deben tener más de 12 alzadas corridas entre descansos. Esto es importante para asegurar la seguridad y permitir descansos adecuados en recorridos largos.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" => "¿La escalera cumple con el ancho libre?",
                "context" =>
                    "El ancho mínimo entre los zócalos debe ser de 1.20 metros para garantizar que las personas, incluidas aquellas con movilidad reducida o en silla de ruedas, puedan utilizarla cómodamente. En lotes más pequeños (8.66 metros o menos de ancho), este puede reducirse a 1.10 metros.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" =>
                    "¿Los escalones de la escalera son iguales entre sí?",
                "context" =>
                    "Todos los escalones de la escalera deben ser de la misma altura y profundidad, asegurando un patrón de movimiento uniforme y reduciendo el riesgo de accidentes.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿Los escalones de escalera cumplen con el ancho mínimo y máximo de pedada y alzada?",
                "context" =>
                    "La altura de los escalones (alzada) debe estar entre 0.15 metros y 0.18 metros, mientras que la profundidad de la huella (pedada) debe estar entre 0.26 metros y 0.30 metros para facilitar el desplazamiento seguro y cómodo.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" =>
                    "Si la escalera cuenta con un descanso, ¿cumple con el ancho mínimo establecido?",
                "context" =>
                    "Los descansos deben tener una profundidad mínima de dos tercios del ancho de la escalera, o al menos 1.25 metros si hay giros de 90° o 180°. Si es un tramo recto sin giros, el mínimo es de 0.95 metros.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" =>
                    "¿La escalera cuenta con pasamanos en ambos lados?",
                "context" =>
                    "Es esencial que las escaleras tengan pasamanos en ambos lados para ofrecer apoyo tanto a personas diestras como zurdas, mejorando la seguridad tanto en subida como en bajada.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿Los pasamanos cumplen con las medidas establecidas?",
                "context" =>
                    "Los pasamanos deben estar a una altura de 0.90 metros desde la nariz del escalón hasta el plano superior del pasamanos. Además, deben tener un diámetro mínimo de 0.04 metros para facilitar su agarre.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" =>
                    "¿Si los pasamanos cuentan con extensión horizontal esta cuenta con las medidas establecidas?",
                "context" =>
                    "Los pasamanos deben extenderse horizontalmente antes y después del tramo de escalones por una longitud mínima de 0.15 metros y un máximo de 0.40 metros para mejorar la accesibilidad.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" => "¿Los pasamanos cumplen con la longitud total?",
                "context" =>
                    "La longitud total de los pasamanos debe abarcar todo el recorrido de la escalera, incluyendo la extensión en los descansos cuando sea necesario, para ofrecer apoyo continuo.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" => "¿La escalera cuenta con zócalos?",
                "context" =>
                    "Si uno o ambos lados de la escalera no tienen una contención lateral, deben incluir zócalos de al menos 0.10 metros de altura para evitar que bastones o sillas de ruedas se deslicen hacia fuera.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿Los zócalos cumplen con las medidas establecidas?",
                "context" =>
                    "Los zócalos deben tener una altura mínima de 0.10 metros, cumpliendo con las normativas de seguridad.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" => "¿La escalera cuenta con solado de prevención?",
                "context" =>
                    "El solado de prevención, formado por baldosas con relieves y colores contrastantes, es clave para advertir a personas con discapacidad visual sobre la presencia de escaleras y posibles peligros.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "Si la escalera es suspendida cumple con las medidas establecidas para este tipo de acceso?",
                "context" =>
                    "Las escaleras suspendidas deben estar señalizadas con un solado contrastante y botones de relieve que sobresalgan 0.60 metros más allá de los bordes laterales para impedir el paso y advertir de la escalera.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" =>
                    "¿Observa algún tipo de señalética accesible de escalera?",
                "context" =>
                    "Las escaleras deben estar señalizadas de manera adecuada con pictogramas accesibles y, si es necesario, incluir información en Braille.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "Según lo comprendido, observado y calculado; ¿cuál es el estado de la escalera?",
                "context" =>
                    "El estado de la escalera debe evaluarse como Bueno (B), Regular (R) o Malo (M), según cumpla con los criterios de accesibilidad establecidos.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_quality", "text"],
            ],
        ];

        $this->createQuestions($questions);
    }

    private function createRampsQuestions(): void
    {
        $questions = [
            [
                "content" =>
                    "¿La rampa cumple con el ancho mínimo y máximo establecido?",
                "context" =>
                    "El ancho de la rampa debe estar entre 0.90 metros y 1.20 metros, permitiendo el tránsito adecuado de personas con movilidad reducida, incluidas aquellas que utilizan sillas de ruedas.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" =>
                    "De acuerdo con la fórmula para calcular la pendiente y los cuadros de referencia, la rampa ¿cumple con la pendiente adecuada máxima de 8 %?",
                "context" =>
                    "La pendiente de la rampa no debe exceder el 8%, para asegurar que sea accesible sin demasiado esfuerzo físico. Se calcula multiplicando la altura a salvar por el valor de relación (por ejemplo, 1/12.5).",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["enum_yesno", "numeric"],
            ],
            [
                "content" => "¿La rampa cuenta con solado de prevención?",
                "context" =>
                    "El solado de prevención, constituido por baldosas con relieves, es esencial para advertir a las personas, especialmente con discapacidad visual, sobre cambios o peligros en el camino.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" => "¿El color del solado es contrastante?",
                "context" =>
                    "El color del solado de prevención debe ser contrastante respecto al suelo circundante, lo que facilita su detección por parte de personas con discapacidad visual.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" => "¿Cuenta con pasamanos?",
                "context" =>
                    "Las rampas deben tener pasamanos dobles y continuos a ambos lados para que las personas puedan sujetarse, tanto al subir como al bajar.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "En caso de poseer pasamanos dobles, ¿cumple con las medidas establecidas?",
                "context" =>
                    "Los pasamanos deben estar colocados a una altura de entre 0.75 y 0.90 metros y deben sobresalir entre 0.15 y 0.20 metros más allá del borde de la rampa.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" => "¿Los laterales tienen algún tipo de contención?",
                "context" =>
                    "Los laterales de la rampa deben contar con barreras de contención, como zócalos o muros, para evitar que sillas de ruedas o bastones se deslicen fuera de la rampa.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" => "¿Si no tienen, cuenta con zócalo?",
                "context" =>
                    "Si la rampa no tiene muros laterales, debe contar con un zócalo de al menos 0.10 metros de altura para impedir que las ruedas de las sillas de ruedas o bastones se deslicen fuera.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿Hay descansos en las distancias correspondientes?",
                "context" =>
                    "Las rampas deben contar con descansos cada 6 metros para permitir que las personas puedan detenerse y descansar si lo necesitan. El descanso debe tener un largo mínimo de 1.50 metros.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿Permite giro de 90° a usuarios en silla de ruedas y ambulantes?",
                "context" =>
                    "El descanso en la rampa debe permitir giros de 90° para que los usuarios en silla de ruedas o con movilidad reducida puedan cambiar de dirección cómodamente.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿Permite giro de 180° a usuarios en silla de ruedas y ambulantes?",
                "context" =>
                    "Si la rampa tiene varios tramos, debe contar con descansos que permitan realizar giros de 180°, brindando suficiente espacio para maniobrar.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" => "¿Cumple con el largo mínimo?",
                "context" =>
                    "El largo mínimo de la rampa depende de la altura que debe salvarse, y debe estar de acuerdo con la pendiente máxima permitida (8%).",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿Observa algún tipo de señalética accesible de rampa?",
                "context" =>
                    "Las rampas deben estar señalizadas adecuadamente con pictogramas accesibles y, si es necesario, incluir información en Braille.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿Según lo comprendido, observado y calculado; cuál es el estado de la rampa?",
                "context" =>
                    "El estado de la rampa debe evaluarse como Bueno (B), Regular (R) o Malo (M), según cumpla con los criterios establecidos para accesibilidad.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["enum_quality", "text"],
            ],
        ];

        $this->createQuestions($questions);
    }

    private function createSignageQuestions(): void
    {
        $questions = [
            [
                "content" => "¿En el edificio hay señalética accesible?",
                "context" =>
                    "La señalética accesible es aquella que permite a personas con discapacidades orientarse, comunicarse y moverse por el entorno de manera autónoma, utilizando pictogramas, textos, símbolos y otros elementos que son perceptibles tanto para personas sin discapacidad como para aquellas con discapacidades sensoriales o de movilidad.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿La señalética posee el símbolo internacional de accesibilidad?",
                "context" =>
                    "El símbolo internacional de accesibilidad representa la independencia y participación activa de las personas con discapacidad. Este símbolo debe estar presente en la señalética para indicar accesibilidad.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" => "¿La señalética tiene una buena iluminación?",
                "context" =>
                    "Es fundamental que la señalética esté bien iluminada para garantizar su visibilidad a todas horas, lo que facilita su lectura y comprensión, especialmente para personas con baja visión.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" => "¿La señalética se encuentra libre de obstáculos?",
                "context" =>
                    "La señalética debe estar colocada en lugares donde no existan objetos o barreras que impidan su visibilidad o acceso, lo que facilita que las personas con movilidad reducida o discapacidades sensoriales puedan usarla.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" => "¿La tipografía utilizada es legible?",
                "context" =>
                    "La legibilidad de la tipografía es clave, recomendándose el uso de fuentes como Sans Serif y evitar abreviaciones o frases complejas para facilitar la lectura rápida y clara.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿Se encuentra protegida con cristal o algún otro elemento?",
                "context" =>
                    "Se debe evitar proteger la señalética con cristales u otros elementos que puedan reflejar luz o dificultar su visibilidad y comprensión.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿El edificio posee señalética en sistema Braille?",
                "context" =>
                    "El sistema Braille es esencial para personas con discapacidad visual, permitiendo la lectura táctil de la información en la señalética.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" => "¿El edificio posee plano háptico?",
                "context" =>
                    "Los planos hápticos son representaciones táctiles del entorno que permiten a las personas, especialmente con discapacidad visual, orientarse y conocer la distribución del espacio.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿El plano háptico se encuentra próximo al ingreso del edificio?",
                "context" =>
                    "Es importante que el plano háptico esté ubicado cerca del ingreso del edificio para que sea accesible desde el momento en que la persona entra al lugar.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" => "¿Posee intérprete de señas?",
                "context" =>
                    "La presencia de intérpretes de lengua de señas asegura la accesibilidad para personas con discapacidad auditiva, facilitando la comunicación.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" => "¿El edificio cuenta con formatos audiovisuales?",
                "context" =>
                    "Los formatos audiovisuales accesibles incluyen subtitulado, audio descripción y locución, lo que permite a personas con discapacidades sensoriales acceder a la información de manera inclusiva.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" => "¿El edificio posee señales audibles?",
                "context" =>
                    "Las señales audibles son importantes para personas con discapacidad visual, permitiendo que la información visual sea replicada mediante sonido, como anuncios por megafonía.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" => "¿El audio contiene descripción y/o locución?",
                "context" =>
                    "La audio descripción y locución proporcionan detalles adicionales sobre el entorno o eventos importantes para personas con discapacidad visual.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿El edificio cuenta con asistencia humana en caso de ser necesario?",
                "context" =>
                    "La asistencia humana puede ser proporcionada mediante guías, intérpretes o personal de apoyo que ayuden a las personas con discapacidades a moverse por el edificio o acceder a servicios.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "Según lo comprendido, observado y calculado; ¿cuál es el estado de la señalética?",
                "context" =>
                    "El estado de la señalética se debe evaluar como Bueno (B), Regular (R) o Malo (M), considerando si cumple o no con los estándares de accesibilidad descritos.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["enum_quality", "text"],
            ],
        ];

        $this->createQuestions($questions);
    }

    /**
     * Get door questions
     */
    private function createDoorsQuestions(): void
    {
        $questions = [
            [
                "content" =>
                    "¿La puerta cumple con el ancho mínimo establecido?",
                "context" =>
                    "Las puertas deben tener un ancho suficiente para permitir el paso de personas con movilidad reducida, incluidas aquellas que utilizan sillas de ruedas. El ancho mínimo recomendado es de 0.80 metros.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" =>
                    "¿La puerta cuenta con el ángulo de apertura establecido?",
                "context" =>
                    "Las puertas deben abrirse al menos 90° para facilitar el acceso. Esto es especialmente importante para asegurar que las personas puedan entrar y salir sin dificultad.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" => "¿La puerta cuenta con mecanismo de apertura?",
                "context" =>
                    "Las puertas deben contar con un mecanismo de apertura que sea fácil de usar para todas las personas, incluidos aquellos con limitaciones de fuerza. Esto puede incluir manijas o pomos que no requieran girar la muñeca.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿El herraje de apertura cuenta con las medidas establecidas?",
                "context" =>
                    "Los herrajes deben estar ubicados a una altura accesible (generalmente entre 0.80 m y 1.20 m desde el suelo) para que todas las personas puedan alcanzarlos y utilizarlos sin dificultad.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" => "¿La puerta cuenta con herrajes de retención?",
                "context" =>
                    "Las puertas de dos o más hojas deben tener pasadores que se puedan accionar desde una altura accesible para garantizar que puedan mantenerse abiertas cuando sea necesario.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿Los herrajes de retención cumplen con las medidas mínimas y máximas establecidas?",
                "context" =>
                    "Es importante que los herrajes de retención estén dentro de las dimensiones específicas establecidas para asegurar que sean utilizables por todas las personas, incluidas aquellas con discapacidades.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿El cerrojo de seguridad cumple con lo establecido?",
                "context" =>
                    "Los cerrojos deben ser de fácil acceso y deben poder accionarse desde el interior en caso de emergencia, evitando el uso de cerraduras con llaves que podrían complicar la salida rápida.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" => "¿La puerta cuenta con herrajes suplementarios?",
                "context" =>
                    "Los herrajes suplementarios son aquellos que facilitan el uso de la puerta por personas de diferentes alturas. Deben estar colocados de manera que todos los usuarios puedan acceder a ellos.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿Los herrajes suplementarios cuentan con las medidas establecidas?",
                "context" =>
                    "Estos herrajes deben cumplir con las dimensiones adecuadas para ser accesibles y utilizables por todos, garantizando la funcionalidad de la puerta.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿Observa algún tipo de señalética accesible de puerta?",
                "context" =>
                    "Es esencial que las puertas cuenten con señalización adecuada que indique su función y acceso, utilizando pictogramas y, si es necesario, información en Braille.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "Según lo comprendido, observado y calculado; ¿cuál es el estado de la puerta?",
                "context" =>
                    "El estado de la puerta debe evaluarse como Bueno (B), Regular (R) o Malo (M), basándose en si cumple con los criterios de accesibilidad establecidos.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["enum_quality", "text"],
            ],
        ];

        $this->createQuestions($questions);
    }

    private function createBathroomsQuestions(): void
    {
        $questions = [
            [
                "content" =>
                    "¿El baño cumple con las dimensiones mínimas establecidas?",
                "context" =>
                    "Es esencial que el baño tenga un espacio adecuado (mínimo de 1.5 metros cuadrados) para permitir la maniobra de una silla de ruedas, garantizando que todas las personas puedan utilizarlo sin restricciones.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" =>
                    "¿El inodoro cumple con las medidas mínimas de aproximación establecidas?",
                "context" =>
                    "Debe haber suficiente espacio lateral (0.80 metros) y frontal (0.90 metros) alrededor del inodoro para facilitar la transferencia desde una silla de ruedas, asegurando un acceso cómodo y seguro.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" =>
                    "¿El baño cumple con la medida mínima de altura de taza de inodoro?",
                "context" =>
                    "La altura de la taza del inodoro debe estar entre 0.50 y 0.52 metros desde el nivel del suelo para facilitar el uso por personas con diferentes capacidades físicas.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" =>
                    "¿El baño cuenta con barras de apoyo y transferencia?",
                "context" =>
                    "Las barras de apoyo son esenciales para ayudar a las personas a levantarse y sentarse en el inodoro. Deben estar fijadas firmemente y ubicarse a una altura accesible (0.75 m a 0.80 m).",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿Las barras de apoyo y transferencia cuentan con las medidas establecidas?",
                "context" =>
                    "Las barras deben cumplir con las dimensiones específicas para asegurar su eficacia y seguridad, sobrepasando el borde del inodoro para brindar apoyo adicional.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" => "¿El baño cuenta con bacha o mesada?",
                "context" =>
                    "Es importante que el baño tenga un lavabo accesible, que debe estar colocado a una altura adecuada para permitir su uso desde una silla de ruedas.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿La bacha o mesada cumple con las medidas establecidas?",
                "context" =>
                    "La bacha debe tener dimensiones que permitan su uso cómodo por personas con diferentes capacidades, asegurando que se pueda acceder sin obstáculos.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿La bacha o mesada cumple con las medidas de superficie mínima de aproximación?",
                "context" =>
                    "Debe haber suficiente espacio frente al lavabo (1.00 metro de profundidad) y a los lados (0.40 metros) para permitir el acceso y la utilización del mismo.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" => "¿La bacha o mesada cuenta con acceso libre?",
                "context" =>
                    "El área debajo del lavabo no debe tener muebles o estructuras que impidan el acercamiento de una silla de ruedas, garantizando así un acceso total.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" => "¿El baño cuenta con espejo?",
                "context" =>
                    "Los espejos deben estar instalados a una altura que permita su uso desde una silla de ruedas, facilitando la visibilidad sin necesidad de ajustar la posición.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" => "¿El espejo cumple con las medidas establecidas?",
                "context" =>
                    "Debe cumplir con las dimensiones adecuadas y estar diseñado para facilitar el uso por personas con diversas capacidades, asegurando que sea funcional.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" => "¿La grifería cumple con lo establecido?",
                "context" =>
                    "La grifería debe ser de fácil acceso y operar de manera simple (por ejemplo, tipo palanca) para que todas las personas puedan usarla sin dificultad.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿El pulsador sanitario de emergencia cumple con las medidas establecidas?",
                "context" =>
                    "Debe estar colocado a una altura accesible (entre 0.40 m y 0.50 m) y ser fácil de usar en caso de necesidad urgente.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" =>
                    "El baño en caso de contar con ducha, ¿cumple con las medidas establecidas?",
                "context" =>
                    "La ducha debe tener suficiente espacio y un diseño accesible (0.90 m x 0.90 m) para facilitar su uso por personas con discapacidades.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno", "text", "numeric"],
            ],
            [
                "content" => "¿El baño cuenta con accesorios?",
                "context" =>
                    "Los accesorios del baño (como toalleros y llaves de luz) deben estar ubicados en posiciones accesibles, dentro del alcance de las personas en silla de ruedas.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿Los accesorios de baño cumplen con las medidas establecidas?",
                "context" =>
                    "Deben estar situados a una altura que permita su uso sin dificultad, asegurando que sean accesibles para todos los usuarios.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿Observa algún tipo de señalética accesible de baño?",
                "context" =>
                    "La señalética en el baño debe ser clara y accesible, utilizando pictogramas y, si es necesario, información en Braille para facilitar la comprensión.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "¿La señalética accesible cuenta con las medidas establecidas?",
                "context" =>
                    "La señalética debe cumplir con las dimensiones adecuadas para ser legible y comprensible, asegurando su efectividad para todas las personas.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno", "text"],
            ],
            [
                "content" =>
                    "Según lo comprendido, observado y calculado; ¿cuál es el estado del baño?",
                "context" =>
                    "El estado del baño debe evaluarse como Bueno (B), Regular (R) o Malo (M), dependiendo de si cumple o no con los criterios de accesibilidad establecidos.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_quality", "text"],
            ],
        ];

        $this->createQuestions($questions);
    }
}
