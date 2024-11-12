<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Question;

class QuestionSeeder extends Seeder
{
    private const EXPECTED_ANSWERS = [
        // Tipos de respuestas básicos
        "enum_yesno" => [
            "answer" => "Sí",
            "type" => "enum",
        ],
        "enum_quality" => [
            "answer" => "Bueno",
            "type" => "enum",
        ],
        "text" => [
            "answer" => "Cumple con la normativa",
            "type" => "text",
        ],

        // Medidas de longitud
        "numeric_width" => [
            "answer" => "0.90",
            "value" => 0.9,
            "type" => "numeric",
            "unit" => "metros",
            "min" => 0.8,
            "max" => 1.2,
        ],
        "numeric_height" => [
            "answer" => "0.85",
            "value" => 0.85,
            "type" => "numeric",
            "unit" => "metros",
            "min" => 0.7,
            "max" => 1.2,
        ],
        "numeric_depth" => [
            "answer" => "0.60",
            "value" => 0.6,
            "type" => "numeric",
            "unit" => "metros",
            "min" => 0.5,
            "max" => 0.7,
        ],

        // Medidas de ángulos y pendientes
        "numeric_angle" => [
            "answer" => "90",
            "value" => 90,
            "type" => "numeric",
            "unit" => "grados",
            "min" => 85,
            "max" => 95,
        ],
        "numeric_slope" => [
            "answer" => "8",
            "value" => 8,
            "type" => "numeric",
            "unit" => "porcentaje",
            "max" => 8,
        ],

        // Medidas de área y espacio
        "numeric_area" => [
            "answer" => "1.50",
            "value" => 1.5,
            "type" => "numeric",
            "unit" => "metros cuadrados",
            "min" => 1.2,
        ],
        "numeric_diameter" => [
            "answer" => "1.50",
            "value" => 1.5,
            "type" => "numeric",
            "unit" => "metros",
            "min" => 1.2,
        ],

        // Medidas de fuerza
        "numeric_force" => [
            "answer" => "25",
            "value" => 25,
            "type" => "numeric",
            "unit" => "newtons",
            "max" => 25,
        ],

        // Medidas de iluminación
        "numeric_illumination" => [
            "answer" => "100",
            "value" => 100,
            "type" => "numeric",
            "unit" => "lux",
            "min" => 100,
        ],
    ];
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

    private function createSignageQuestions(): void
    {
        $questions = [
            [
                "content" => "¿En el edificio hay señalética accesible?",
                "context" =>
                    "La señalética accesible es aquella que permite a personas con discapacidades orientarse, comunicarse y moverse por el entorno de manera autónoma. Debe ser clara, visible y comprensible para todos.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La señalética posee el símbolo internacional de accesibilidad?",
                "context" =>
                    "El símbolo internacional de accesibilidad es esencial para identificar espacios y servicios accesibles, debe estar visible y seguir los estándares internacionales de diseño.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" => "¿La señalética tiene una buena iluminación?",
                "context" =>
                    "La iluminación adecuada es crucial para la visibilidad de la señalética. Debe ser uniforme, evitar reflejos y asegurar que la información sea legible en diferentes condiciones de luz.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" => "¿La señalética se encuentra libre de obstáculos?",
                "context" =>
                    "La señalética debe ser visible y accesible sin obstáculos que impidan su lectura o percepción. El área circundante debe estar despejada para permitir un acercamiento adecuado.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" => "¿La tipografía utilizada es legible?",
                "context" =>
                    "La tipografía debe ser clara, de tamaño adecuado y con suficiente contraste. Se recomiendan fuentes sans-serif con un tamaño mínimo según la distancia de lectura.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿Se encuentra protegida con cristal o algún otro elemento?",
                "context" =>
                    "La protección de la señalética no debe interferir con su visibilidad ni generar reflejos. Si existe protección, debe ser antirreflejante y no crear barreras visuales.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿El edificio posee señalética en sistema Braille?",
                "context" =>
                    "La señalética en Braille es esencial para personas con discapacidad visual. Debe estar ubicada a una altura accesible y seguir los estándares de escritura Braille.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" => "¿El edificio posee plano háptico?",
                "context" =>
                    "Los planos hápticos permiten a personas con discapacidad visual comprender la distribución espacial mediante el tacto. Deben incluir leyendas en Braille y relieves claramente diferenciables.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿El plano háptico se encuentra próximo al ingreso del edificio?",
                "context" =>
                    "La ubicación del plano háptico debe ser accesible desde el ingreso, preferentemente en un lugar intuitivo y de fácil acceso, con espacio suficiente para su exploración.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" => "¿Posee intérprete de señas?",
                "context" =>
                    "La disponibilidad de intérprete de señas facilita la comunicación para personas sordas. Puede ser presencial o mediante sistemas de video interpretación.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" => "¿El edificio cuenta con formatos audiovisuales?",
                "context" =>
                    "Los formatos audiovisuales complementan la señalética tradicional, proporcionando información accesible para diferentes tipos de usuarios. Deben incluir subtítulos y audiodescripción.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" => "¿El edificio posee señales audibles?",
                "context" =>
                    "Las señales audibles son importantes para personas con discapacidad visual. Deben ser claras, con volumen adecuado y diferenciables de otros sonidos ambientales.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" => "¿El audio contiene descripción y/o locución?",
                "context" =>
                    "La descripción auditiva debe ser clara, informativa y proporcionar detalles relevantes sobre el entorno y la orientación. Debe usar un lenguaje simple y directo.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿El edificio cuenta con asistencia humana en caso de ser necesario?",
                "context" =>
                    "La asistencia humana complementa los sistemas de señalización, proporcionando apoyo personalizado cuando sea necesario. El personal debe estar capacitado en atención a personas con discapacidad.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["text", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿Según lo comprendido, observado y calculado; cuál es el estado de la señalética?",
                "context" =>
                    "Evaluación general del estado y funcionalidad de la señalética, considerando su efectividad para diferentes tipos de usuarios y su cumplimiento con los estándares de accesibilidad.",
                "element_id" => self::ELEMENTS["signage"],
                "answer_types" => ["enum_quality"],
            ],
        ];

        $this->createQuestions($questions);
    }

    private function createStairQuestions(): void
    {
        $questions = [
            [
                "content" =>
                    "¿El tramo de escalera cumple con la cantidad de alzadas corridas entre descansos?",
                "context" =>
                    "Las escaleras no deben tener más de 12 alzadas corridas entre descansos.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" => "¿La escalera cumple con el ancho libre?",
                "context" =>
                    "El ancho mínimo entre los zócalos debe ser de 1.20 metros (puede reducirse a 1.10 metros en lotes pequeños).",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["numeric_width", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿Los escalones de la escalera son iguales entre sí?",
                "context" =>
                    "Todos los escalones deben tener la misma altura y profundidad.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_yesno"],
            ],
            [
                "content" =>
                    "¿La altura de los escalones (alzada) es correcta?",
                "context" => "La altura debe estar entre 0.15 y 0.18 metros.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La profundidad de los escalones (pedada) es correcta?",
                "context" =>
                    "La profundidad debe estar entre 0.26 y 0.30 metros.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["numeric_depth", "enum_yesno"],
            ],
            [
                "content" => "¿El descanso cumple con la profundidad mínima?",
                "context" =>
                    "Mínimo 1.25 metros para giros, 0.95 metros en tramo recto.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["numeric_length", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La escalera cuenta con pasamanos en ambos lados?",
                "context" =>
                    "Debe tener pasamanos en ambos lados para ofrecer apoyo.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_yesno"],
            ],
            [
                "content" => "¿La altura de los pasamanos es correcta?",
                "context" =>
                    "Los pasamanos deben estar a 0.90 metros desde la nariz del escalón.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" => "¿El diámetro de los pasamanos es adecuado?",
                "context" => "El diámetro mínimo debe ser de 0.04 metros.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["numeric_diameter", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La extensión horizontal de los pasamanos es correcta?",
                "context" =>
                    "Deben extenderse entre 0.15 y 0.40 metros antes y después del tramo.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["numeric_length", "enum_yesno"],
            ],
            [
                "content" => "¿La altura del zócalo es adecuada?",
                "context" =>
                    "Los zócalos deben tener una altura mínima de 0.10 metros.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿El solado de prevención sobresale la distancia correcta?",
                "context" =>
                    "Debe sobresalir 0.60 metros más allá de los bordes laterales.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["numeric_length", "enum_yesno"],
            ],
            [
                "content" => "¿La iluminación es adecuada?",
                "context" => "Debe tener un nivel mínimo de 100 lux.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["numeric_illumination", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿Observa algún tipo de señalética accesible de escalera?",
                "context" =>
                    "Debe contar con señalización adecuada y pictogramas accesibles.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_yesno"],
            ],
            [
                "content" =>
                    "Según lo comprendido, observado y calculado; ¿cuál es el estado de la escalera?",
                "context" =>
                    "Evaluación general del estado y accesibilidad de la escalera.",
                "element_id" => self::ELEMENTS["stairs"],
                "answer_types" => ["enum_quality"],
            ],
        ];

        $this->createQuestions($questions);
    }

    private function createRampsQuestions(): void
    {
        $questions = [
            [
                "content" => "¿El ancho de la rampa es adecuado?",
                "context" => "El ancho debe estar entre 0.90 y 1.20 metros.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["numeric_width", "enum_yesno"],
            ],
            [
                "content" => "¿La pendiente de la rampa es correcta?",
                "context" =>
                    "La pendiente no debe exceder el 8%. Fórmula: (altura/longitud) x 100.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["numeric_slope", "enum_yesno"],
            ],
            [
                "content" => "¿La longitud del tramo es adecuada?",
                "context" =>
                    "Máximo 6 metros entre descansos, calculado en proyección horizontal.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["numeric_length", "enum_yesno"],
            ],
            [
                "content" => "¿La altura del pasamanos inferior es correcta?",
                "context" =>
                    "El pasamanos inferior debe estar entre 0.75 y 0.80 metros.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" => "¿La altura del pasamanos superior es correcta?",
                "context" =>
                    "El pasamanos superior debe estar entre 0.90 y 0.95 metros.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" => "¿El diámetro de los pasamanos es adecuado?",
                "context" =>
                    "Los pasamanos deben tener un diámetro entre 0.04 y 0.05 metros.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["numeric_diameter", "enum_yesno"],
            ],
            [
                "content" => "¿La longitud del descanso es suficiente?",
                "context" =>
                    "El descanso debe tener mínimo 1.50 metros de largo.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["numeric_length", "enum_yesno"],
            ],
            [
                "content" => "¿La altura del zócalo es adecuada?",
                "context" =>
                    "El zócalo debe tener una altura mínima de 0.10 metros.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" => "¿El espacio de giro en descansos es suficiente?",
                "context" => "Para giros de 90°, mínimo 1.20 x 1.20 metros.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["numeric_area", "enum_yesno"],
            ],
            [
                "content" => "¿El espacio para giro de 180° es adecuado?",
                "context" => "Para giros de 180°, mínimo 1.50 x 1.50 metros.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["numeric_area", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La extensión horizontal de los pasamanos es correcta?",
                "context" =>
                    "Deben extenderse 0.30 metros al comienzo y final de la rampa.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["numeric_length", "enum_yesno"],
            ],
            [
                "content" => "¿El espacio de aproximación está libre?",
                "context" =>
                    "Debe existir un espacio de 1.50 metros de diámetro al inicio y final.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["numeric_diameter", "enum_yesno"],
            ],
            [
                "content" => "¿La iluminación es adecuada?",
                "context" =>
                    "Debe tener un nivel mínimo de 100 lux, uniforme en toda la rampa.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["numeric_illumination", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿El solado de prevención tiene el ancho correcto?",
                "context" =>
                    "Debe tener un ancho mínimo de 0.60 metros en todo el ancho de la rampa.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["numeric_width", "enum_yesno"],
            ],
            [
                "content" => "¿La rampa cuenta con solado antideslizante?",
                "context" =>
                    "La superficie debe ser antideslizante y sin irregularidades.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["enum_yesno"],
            ],
            [
                "content" => "¿Cuenta con pasamanos en ambos lados?",
                "context" => "Debe tener pasamanos continuos en ambos lados.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["enum_yesno"],
            ],
            [
                "content" => "¿Cuenta con señalización adecuada?",
                "context" =>
                    "Debe tener señalización clara y pictogramas accesibles.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["enum_yesno"],
            ],
            [
                "content" =>
                    "Según lo comprendido, observado y calculado; ¿cuál es el estado de la rampa?",
                "context" =>
                    "Evaluación general del estado y accesibilidad de la rampa.",
                "element_id" => self::ELEMENTS["ramps"],
                "answer_types" => ["enum_quality"],
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
                "content" => "¿El ancho libre de la puerta es adecuado?",
                "context" =>
                    "El ancho libre mínimo debe ser de 0.80 metros para permitir el paso de una silla de ruedas.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["numeric_width", "enum_yesno"],
            ],
            [
                "content" => "¿La altura de la manija es correcta?",
                "context" =>
                    "La manija debe estar a una altura entre 0.80 y 1.00 metros del suelo.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La altura del mecanismo de apertura es adecuada?",
                "context" =>
                    "Los herrajes de accionamiento deben estar entre 0.80 y 1.20 metros del suelo.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿El espacio de maniobra frente a la puerta es suficiente?",
                "context" =>
                    "Debe existir un círculo libre de 1.50 metros de diámetro para el giro de una silla de ruedas.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["numeric_diameter", "enum_yesno"],
            ],
            [
                "content" => "¿El ángulo de apertura es suficiente?",
                "context" =>
                    "La puerta debe poder abrirse al menos 90° para permitir un acceso completo.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["numeric_angle", "enum_yesno"],
            ],
            [
                "content" => "¿La altura de la mirilla es accesible?",
                "context" =>
                    "La mirilla debe estar entre 1.10 y 1.50 metros de altura.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" => "¿La altura del zócalo protector es suficiente?",
                "context" =>
                    "El zócalo debe tener una altura mínima de 0.30 metros.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La separación entre la manija y la puerta es adecuada?",
                "context" =>
                    "Debe existir una separación mínima de 0.04 metros entre la manija y la puerta.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["numeric_depth", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La altura de la banda inferior de señalización es correcta?",
                "context" =>
                    "La banda inferior debe estar entre 0.85 y 1.10 metros de altura.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La altura de la banda superior de señalización es correcta?",
                "context" =>
                    "La banda superior debe estar entre 1.40 y 1.60 metros de altura.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La fuerza necesaria para abrir la puerta es adecuada?",
                "context" => "La fuerza máxima no debe superar los 25 newtons.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["numeric_force", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿El espacio libre lateral junto a la manija es suficiente?",
                "context" =>
                    "Debe existir un espacio libre lateral de al menos 0.30 metros junto a la manija.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["numeric_width", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La iluminación en la zona de la puerta es adecuada?",
                "context" =>
                    "Debe tener un nivel mínimo de 100 lux en la zona de la puerta.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["numeric_illumination", "enum_yesno"],
            ],
            [
                "content" => "¿El mecanismo de apertura es accesible?",
                "context" =>
                    "Debe ser de fácil accionamiento, tipo palanca o presión.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["enum_yesno"],
            ],
            [
                "content" => "¿La puerta cuenta con sistema de retención?",
                "context" =>
                    "En puertas de dos hojas, debe permitir fijar una o ambas hojas.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["enum_yesno"],
            ],
            [
                "content" =>
                    "¿El contraste visual entre puerta y paredes es adecuado?",
                "context" =>
                    "Debe existir un contraste visual claro entre la puerta y las paredes circundantes.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["enum_yesno"],
            ],
            [
                "content" => "¿Cuenta con señalización accesible?",
                "context" =>
                    "Debe tener señalización clara y pictogramas accesibles.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["enum_yesno"],
            ],
            [
                "content" =>
                    "Según lo comprendido, observado y calculado; ¿cuál es el estado de la puerta?",
                "context" =>
                    "Evaluación general del estado y accesibilidad de la puerta.",
                "element_id" => self::ELEMENTS["doors"],
                "answer_types" => ["enum_quality"],
            ],
        ];

        $this->createQuestions($questions);
    }

    private function createBathroomsQuestions(): void
    {
        $questions = [
            [
                "content" => "¿El espacio libre para giro es suficiente?",
                "context" =>
                    "Debe permitir un giro de 360° con un diámetro mínimo de 1.50 metros.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["numeric_diameter", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿El ancho del espacio lateral del inodoro es adecuado?",
                "context" =>
                    "El espacio lateral debe tener mínimo 0.80 metros para transferencia.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["numeric_width", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La profundidad del espacio frente al inodoro es correcta?",
                "context" =>
                    "Debe existir un espacio frontal de 0.90 metros mínimo.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["numeric_depth", "enum_yesno"],
            ],
            [
                "content" => "¿La altura del asiento del inodoro es adecuada?",
                "context" =>
                    "La altura debe estar entre 0.45 y 0.50 metros desde el nivel del piso.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La altura de la barra de apoyo horizontal es correcta?",
                "context" =>
                    "Las barras horizontales deben estar entre 0.70 y 0.75 metros de altura.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La longitud de las barras de apoyo es suficiente?",
                "context" =>
                    "Las barras deben tener una longitud mínima de 0.70 metros.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["numeric_length", "enum_yesno"],
            ],
            [
                "content" => "¿El diámetro de las barras de apoyo es adecuado?",
                "context" => "El diámetro debe estar entre 0.03 y 0.04 metros.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["numeric_diameter", "enum_yesno"],
            ],
            [
                "content" => "¿La altura superior del lavamanos es correcta?",
                "context" =>
                    "Debe estar entre 0.80 y 0.85 metros desde el nivel del piso.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La altura libre bajo el lavamanos es suficiente?",
                "context" =>
                    "Debe tener mínimo 0.70 metros de altura libre inferior.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La profundidad libre bajo el lavamanos es adecuada?",
                "context" =>
                    "Debe tener mínimo 0.25 metros de profundidad libre.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["numeric_depth", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La altura del borde inferior del espejo es correcta?",
                "context" => "Debe estar a máximo 0.90 metros del piso.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" => "¿La altura de los accesorios es accesible?",
                "context" => "Deben estar entre 0.70 y 1.20 metros de altura.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" => "¿El ancho de la ducha es adecuado?",
                "context" => "Debe tener mínimo 0.90 metros de ancho.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["numeric_width", "enum_yesno"],
            ],
            [
                "content" => "¿La profundidad de la ducha es suficiente?",
                "context" => "Debe tener mínimo 1.20 metros de profundidad.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["numeric_depth", "enum_yesno"],
            ],
            [
                "content" => "¿La altura del asiento de ducha es correcta?",
                "context" => "Debe estar entre 0.45 y 0.50 metros de altura.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" => "¿El ancho de la puerta es suficiente?",
                "context" => "Debe tener mínimo 0.80 metros de ancho libre.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["numeric_width", "enum_yesno"],
            ],
            [
                "content" =>
                    "¿La altura del pulsador de emergencia es accesible?",
                "context" => "Debe estar entre 0.40 y 0.50 metros del piso.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["numeric_height", "enum_yesno"],
            ],
            [
                "content" => "¿El nivel de iluminación es adecuado?",
                "context" =>
                    "Debe tener mínimo 100 lux de iluminación uniforme.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["numeric_illumination", "enum_yesno"],
            ],
            [
                "content" => "¿La grifería es de tipo palanca o presión?",
                "context" =>
                    "Debe ser de fácil accionamiento sin requerir giro de muñeca.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno"],
            ],
            [
                "content" => "¿La puerta abre hacia afuera o es corredera?",
                "context" =>
                    "Debe abrir hacia afuera o ser corredera para no reducir el espacio interior.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno"],
            ],
            [
                "content" => "¿Cuenta con señalización accesible?",
                "context" =>
                    "Debe tener el Símbolo Internacional de Accesibilidad y pictogramas claros.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_yesno"],
            ],
            [
                "content" =>
                    "Según lo comprendido, observado y calculado; ¿cuál es el estado del baño?",
                "context" =>
                    "Evaluación general del estado y accesibilidad del baño.",
                "element_id" => self::ELEMENTS["bathrooms"],
                "answer_types" => ["enum_quality"],
            ],
        ];

        $this->createQuestions($questions);
    }
}
