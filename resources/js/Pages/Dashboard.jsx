import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-azul">
                    Panel de Accesibilidad e Inclusión
                </h2>
            }
        >
            <Head title="Panel Principal" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Grid de Elementos Clave */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {/* Señalética */}
                        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-celeste">
                            <h3 className="text-lg font-bold text-azul mb-3">
                                Señalética Accesible
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                La señalética debe utilizar símbolos claros,
                                tipografía legible y ubicarse en lugares
                                visibles y bien iluminados. Puede incluir el
                                símbolo internacional de accesibilidad,
                                información en Braille y señalización táctil y
                                sonora. Estas características son fundamentales
                                para orientar a personas con discapacidad visual
                                o auditiva.
                            </p>
                        </div>

                        {/* Rampas */}
                        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-verde">
                            <h3 className="text-lg font-bold text-azul mb-3">
                                Rampas de Acceso
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Las rampas permiten el desplazamiento seguro de
                                personas con movilidad reducida. Deben cumplir
                                con una pendiente máxima del 8% y estar
                                equipadas con pasamanos dobles a ambos lados,
                                solado de prevención con colores contrastantes,
                                y descansos en recorridos largos.
                            </p>
                        </div>

                        {/* Escaleras */}
                        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-naranja">
                            <h3 className="text-lg font-bold text-azul mb-3">
                                Escaleras Accesibles
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Las escaleras deben tener un ancho mínimo de
                                1.20 metros, pasamanos a ambos lados, y
                                descansos cada 12 escalones. Para personas con
                                discapacidad visual, se recomienda incluir
                                solado de prevención y señalización que advierta
                                sobre su presencia.
                            </p>
                        </div>

                        {/* Puertas */}
                        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-amarillo">
                            <h3 className="text-lg font-bold text-azul mb-3">
                                Puertas Accesibles
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Las puertas deben ser lo suficientemente anchas
                                para el paso de sillas de ruedas (mínimo de 0.80
                                metros) y contar con mecanismos de apertura
                                sencillos y accesibles, como manijas a una
                                altura estándar. Los cerrojos deben ser de fácil
                                uso en emergencias, y las puertas corredizas
                                automáticas deben ser preferidas en áreas de
                                alto tráfico.
                            </p>
                        </div>

                        {/* Sanitarios */}
                        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-celeste">
                            <h3 className="text-lg font-bold text-azul mb-3">
                                Sanitarios Adaptados
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Los sanitarios accesibles incluyen inodoros y
                                lavabos a una altura adecuada para sillas de
                                ruedas, barras de apoyo, y pulsadores de
                                emergencia. Los espejos inclinados y la grifería
                                de fácil accionamiento facilitan su uso por
                                personas con movilidad reducida.
                            </p>
                        </div>

                        {/* Formatos Audiovisuales */}
                        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-verde">
                            <h3 className="text-lg font-bold text-azul mb-3">
                                Formatos Audiovisuales
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Los contenidos audiovisuales accesibles deben
                                contar con subtítulos, interpretación en lengua
                                de señas y audio descripción. Las señales
                                audibles permiten a personas con discapacidad
                                visual orientarse o recibir información de
                                manera efectiva.
                            </p>
                        </div>
                    </div>

                    {/* Recursos Complementarios */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h3 className="text-xl font-bold text-azul mb-4">
                            Recursos Complementarios
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="p-4 bg-blancoSuave rounded-lg">
                                <h4 className="font-bold text-azul mb-2">
                                    Asistencia Humana
                                </h4>
                                <p className="text-gray-700">
                                    Guías e intérpretes disponibles para
                                    facilitar el acceso y la comunicación.
                                </p>
                            </div>
                            <div className="p-4 bg-blancoSuave rounded-lg">
                                <h4 className="font-bold text-azul mb-2">
                                    Aro Magnético
                                </h4>
                                <p className="text-gray-700">
                                    Sistema de amplificación de sonido para
                                    usuarios de audífonos.
                                </p>
                            </div>
                            <div className="p-4 bg-blancoSuave rounded-lg">
                                <h4 className="font-bold text-azul mb-2">
                                    Plano Háptico
                                </h4>
                                <p className="text-gray-700">
                                    Planos en relieve para exploración táctil
                                    del espacio.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
