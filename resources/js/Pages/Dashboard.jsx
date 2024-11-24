import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Panel Principal" />

            <div className="py-6 mt-16">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Sección de tipos de usuarios */}
                    <div className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-300 bg-azul">
                            <h2 className="text-3xl font-bold text-white">
                                Tipos de Usuarios
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                                    La heterogeneidad de limitaciones entre las
                                    diversas personas es una de las principales
                                    dificultades para proponer soluciones
                                    arquitectónicas accesibles para toda la
                                    población. Podríamos decir que el entorno
                                    accesible universal sería la suma de los
                                    entornos accesibles para cada uno de los
                                    individuos, y si bien esta universalidad es
                                    prácticamente imposible de conseguir, sí que
                                    resulta viable aproximarse al objetivo.
                                    Existe un mínimo de características comunes
                                    que permiten llegar a definir tres grandes
                                    grupos de población con necesidades de
                                    accesibilidad parecidas:
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
                        {/* Sección de ambulantes */}
                        <div className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden ">
                            <div className="px-6 py-4 border-b border-gray-300 bg-azul">
                                <h2 className="text-3xl font-bold text-white">
                                    Ambulantes
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                                        Aquellos que ejecutan determinados
                                        movimientos con dificultad, sea con la
                                        ayuda o no de aparatos ortopédicos. Los
                                        principales problemas que afectan a este
                                        colectivo son:
                                    </p>

                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed bg-white border-l-4 border-hazul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                        Dificultades de desplazamiento:
                                        Dificultad en salvar pendientes
                                        pronunciadas, desniveles aislados y
                                        escaleras, tanto por problemas de fuerza
                                        como de equilibrio. Dificultad en pasar
                                        por espacios estrechos. Dificultad en
                                        recorrer trayectos largos sin descansar.
                                        Mayor peligro de caídas por resbalones o
                                        tropiezos de los pies o los bastones.
                                    </p>
                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed bg-white border-l-4 border-hazul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                        Dificultades de uso: Dificultad en abrir
                                        y cerrar puertas, especialmente si
                                        tienen mecanismos de retorno, dificultad
                                        para mantener el equilibrio, dificultad
                                        para sentarse y levantarse, dificultad
                                        para accionar mecanismos que precisan de
                                        ambas manos a la vez.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Sección de USUARIOS DE SILLA DE RUEDAS */}
                        <div className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-300 bg-azul">
                                <h2 className="text-3xl font-bold text-white">
                                    Usuarios en Silla de Ruedas
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                                        Aquellos que precisan de una silla de
                                        ruedas para llevar a cabo sus
                                        actividades, bien de forma autónoma o
                                        con ayuda de terceras personas. Los
                                        principales problemas que afectan a este
                                        colectivo son:
                                    </p>

                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed bg-white border-l-4 border-hazul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                        Dificultades de desplazamiento:
                                        Imposibilidad de superar desniveles
                                        aislados, escaleras y Página 6pendientes
                                        pronunciadas. Peligro de volcar (en
                                        escaleras, travesaños, etc.).
                                        Imposibilidad de pasar por lugares
                                        estrechos. Necesidad de espacios amplios
                                        para girar, abrir puertas, etc.
                                    </p>
                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed bg-white border-l-4 border-hazul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                        Dificultades de uso: Limitación de sus
                                        posibilidades de alcanzar objetos.
                                        Limitación de sus áreas de visión.
                                        Dificultades por el obstáculo que
                                        representan sus propias piernas.
                                        Problemas de compatibilidad entre su
                                        silla de ruedas y otros elementos de
                                        mobiliario.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sección de sensoriales */}
                    <div className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden mt-6">
                        <div className="px-6 py-4 border-b border-gray-300 bg-azul">
                            <h2 className="text-3xl font-bold text-white">
                                Sensoriales
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                                    Aquellos que tienen dificultades de
                                    percepción, debido a limitaciones en sus
                                    capacidades sensitivas, principalmente las
                                    auditivas y las visuales.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
                        {/* Sección de DEFICIENCIA VISUAL */}
                        <div className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden ">
                            <div className="px-6 py-4 border-b border-gray-300 bg-azul">
                                <h2 className="text-3xl font-bold text-white">
                                    Deficiencia Visual
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                                        Las personas con algún tipo de
                                        deficiencia en el sentido de la vista
                                        encuentran limitada su autonomía en base
                                        a:
                                    </p>

                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed bg-white border-l-4 border-hazul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                        Dificultades de desplazamiento:
                                        Problemas para detectar obstáculos
                                        (desniveles, elementos salientes,
                                        agujeros, etc.). Dificultades para
                                        determinar direcciones y para el
                                        seguimiento de itinerarios.
                                    </p>
                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed bg-white border-l-4 border-hazul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                        Dificultades de uso: Limitaciones en la
                                        obtención de información gráfica
                                        (escritos, imágenes gráficas, colores,
                                        etc.). Dificultad para localizar objetos
                                        plurales (botoneras, tiradores,
                                        elementos de mando en general, etc.)
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Sección de DEFICIENCIA AUDITIVA */}
                        <div className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-300 bg-azul">
                                <h2 className="text-3xl font-bold text-white">
                                    Deficiencia Auditiva
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                                        Cuyo principal problema es de
                                        comunicación que genera también:
                                    </p>

                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed bg-white border-l-4 border-hazul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                        Dificultades de desplazamiento:
                                        Sensación de aislamiento respecto al
                                        entorno. Limitaciones en la captación de
                                        señales o advertencias acústicas.
                                    </p>
                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed bg-white border-l-4 border-hazul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                        Dificultades de uso: Problemas para
                                        obtener la información ofrecida mediante
                                        señales acústicas (voz, alarmas,
                                        timbres, etc.). Limitación de la
                                        capacidad de relación e intercambio con
                                        las demás personas. Sensación de
                                        aislamiento respecto al entorno.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
