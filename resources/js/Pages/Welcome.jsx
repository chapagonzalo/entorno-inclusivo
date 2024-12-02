import { Head, Link } from "@inertiajs/react";
import Logo from "../assets/Logo.svg";
import PatioUniversitario from "../assets/patioUniversitario.jpg";
import EvaluandoRampa from "../assets/EvaluandoRampa.jpg";
import HaciendoEvaluacion from "../assets/haciendoEvaluacion.jpg";
import Modal from "../Components/Modal";
import { useState } from "react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Bienvenido/a" />
            <div className="font-sans bg-gray-100 text-black/70">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="flex justify-between items-center py-10">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                <img src={Logo} alt="Logo" />
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end text-black font-sans">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="rounded-md bg-azul text-white px-4 py-2 transition duration-200 ease-in-out ring-1 ring-transparent hover:bg-hazul hover:ring-azul focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D20]"
                                    >
                                        Inicio
                                    </Link>
                                ) : (
                                    <div className="flex flex-col lg:flex-row">
                                        <Link
                                            href={route("login")}
                                            className="rounded-md bg-azul text-white px-4 py-2 transition duration-200 ease-in-out ring-1 ring-transparent hover:bg-hazul hover:ring-azul focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D20] mb-2 lg:mb-0 lg:mr-2"
                                        >
                                            Ingresar
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md bg-azul text-white px-4 py-2 transition duration-200 ease-in-out ring-1 ring-transparent hover:bg-hazul hover:ring-azul focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D20]"
                                        >
                                            Registrarse
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="py-12 rounded-lg">
                                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                    {/* Sección de introducción */}
                                    <div className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                                        <div className="px-6 py-4 border-b border-gray-300 bg-azul">
                                            <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                                Entorno Inclusivo
                                            </h2>
                                        </div>
                                        <div className="p-4 sm:p-6">
                                            <div className="flex justify-center relative mb-3 group">
                                                {/* Imagen con efectos de transición y sombras */}
                                                <img
                                                    src={PatioUniversitario}
                                                    alt="Vista del patio de una universidad, con áreas abiertas, árboles y posiblemente mobiliario como bancos o señalización."
                                                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
                                                />
                                            </div>
                                            <div className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
                                                <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                                                    Una persona con discapacidad
                                                    es aquella que tiene
                                                    deficiencias físicas,
                                                    mentales, intelectuales o
                                                    sensoriales a largo plazo
                                                    que, al interactuar con
                                                    diversas barreras, puedan
                                                    impedir su participación
                                                    plena y efectiva en la
                                                    sociedad, en igualdad de
                                                    condiciones con los demás.
                                                </p>
                                                <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                                                    Algunas personas pueden
                                                    necesitar apoyo todo el
                                                    tiempo o mucho tiempo para
                                                    moverse, para trasladarse,
                                                    para entender, para
                                                    relacionarse con otras
                                                    personas, con la forma en
                                                    que funciona alguna parte de
                                                    su cuerpo, con la forma en
                                                    que funciona alguno de sus
                                                    sentidos. A veces estas
                                                    personas están en un lugar
                                                    que no tiene los apoyos que
                                                    necesitan para poder
                                                    desempeñarse con facilidad
                                                    impidiéndoles desarrollarse
                                                    como todos los demás.
                                                    Entonces decimos que esas
                                                    personas son personas con
                                                    discapacidad.
                                                </p>
                                                <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                                                    Es necesario comprender a la
                                                    inclusión en un sentido real
                                                    y concreto, que implica, por
                                                    un lado, ser conscientes de
                                                    la existencia de las
                                                    barreras que construimos
                                                    como sociedad y, al mismo
                                                    tiempo, sostener una actitud
                                                    activa tendiente a
                                                    eliminarlas.
                                                </p>
                                                <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                                                    Muchas de estas barreras
                                                    tienen origen en
                                                    estereotipos, prejuicios y
                                                    concepciones erradas y
                                                    antiguas, que promueven la
                                                    naturalización de prácticas
                                                    discriminatorias,
                                                    excluyentes y segregadoras
                                                    para este colectivo. De esta
                                                    manera, suele suceder que
                                                    aceptamos sin mayores
                                                    cuestionamientos ciertos
                                                    criterios que limitan el
                                                    ejercicio de la autonomía y
                                                    de la autodeterminación de
                                                    las personas con
                                                    discapacidad, obstaculizando
                                                    su desarrollo en igualdad de
                                                    condiciones con las demás.
                                                </p>
                                                <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                                                    En este sentido, es
                                                    importante impulsar un
                                                    cambio cultural a partir de
                                                    la toma de conciencia acerca
                                                    de que todas las personas
                                                    tenemos igualdad de
                                                    derechos, y de que la
                                                    diversidad es una gran
                                                    riqueza para toda sociedad
                                                    que la respeta y valora.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
                                        {/* Sección de objetivo */}
                                        <div className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden ">
                                            <div className="px-6 py-4 border-b border-gray-300 bg-azul">
                                                <h2 className="text-3xl font-bold text-white">
                                                    Objetivo
                                                </h2>
                                            </div>
                                            <div className="p-6">
                                                <div className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                                                        Promover la
                                                        accesibilidad y la
                                                        eliminación de barreras
                                                        en entornos públicos,
                                                        facilitando la
                                                        movilidad, comunicación
                                                        y uso de espacios para
                                                        personas con
                                                        discapacidades y
                                                        necesidades de
                                                        asistencia.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Sección de importancia */}
                                        <div className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                                            <div className="px-6 py-4 border-b border-gray-300 bg-azul">
                                                <h2 className="text-3xl font-bold text-white">
                                                    Importancia de la Inclusión
                                                </h2>
                                            </div>
                                            <div className="p-6">
                                                <div className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                                                        Promover entornos
                                                        accesibles no solo
                                                        responde a las
                                                        normativas legales, sino
                                                        que impulsa una sociedad
                                                        más justa e inclusiva,
                                                        donde cada persona pueda
                                                        participar y desarrollar
                                                        sus actividades en
                                                        igualdad de condiciones.
                                                        La accesibilidad y la
                                                        diversidad no solo
                                                        enriquecen las
                                                        interacciones, sino que
                                                        también fortalecen la
                                                        autonomía individual,
                                                        creando espacios
                                                        públicos más equitativos
                                                        y respetuosos para
                                                        todos.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Sección de Imágenes */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
                                        {[
                                            {
                                                src: HaciendoEvaluacion,
                                                alt: "Grupo de personas realizando una evaluación de accesibilidad en una instalación, inspeccionando elementos físicos del entorno.",
                                            },
                                            {
                                                src: EvaluandoRampa,
                                                alt: "Persona evaluando la pendiente y accesibilidad de una rampa, posiblemente midiendo su inclinación o inspeccionando sus características.",
                                            },
                                        ].map((image, index) => (
                                            <div
                                                key={index}
                                                className="relative group"
                                            >
                                                <div className="w-full h-96 overflow-hidden rounded-lg shadow-lg border border-gray-300">
                                                    <img
                                                        src={image.src}
                                                        alt={image.alt}
                                                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                                                    />
                                                </div>
                                                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Sección de accesibilidad */}
                                    <div className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden mt-6">
                                        <div className="px-6 py-4 border-b border-gray-300 bg-azul">
                                            <h2 className="text-3xl font-bold text-white">
                                                Accesibilidad
                                            </h2>
                                        </div>
                                        <div className="p-6">
                                            <div className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                                                    Las actividades de nuestra
                                                    vida cotidiana son muy
                                                    variadas, pero las
                                                    dificultades de
                                                    accesibilidad que surgen al
                                                    llevarlas a cabo se repiten.
                                                    Es conveniente, por tanto,
                                                    analizar estas actividades
                                                    desde la óptica de la
                                                    accesibilidad para detectar
                                                    qué tipos de dificultades
                                                    generan y tratar de buscar
                                                    alternativas.
                                                </p>
                                                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                                                    Podría decirse que, desde el
                                                    punto de vista de la
                                                    accesibilidad, toda
                                                    actividad que desarrolla una
                                                    persona tiene dos
                                                    componentes, el
                                                    desplazamiento y el uso.
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                                <div className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                                                        EL DESPLAZAMIENTO, es
                                                        decir, el traslado hasta
                                                        el lugar idóneo para
                                                        realizar la acción,
                                                        poder moverse libremente
                                                        por el entorno sin
                                                        limitaciones ni
                                                        obstáculos. Este puede
                                                        ser:
                                                    </p>

                                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed bg-white border-l-4 border-hazul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                                        • Horizontal, moviéndose
                                                        por pasillos,
                                                        corredores,
                                                        dependencias, etc.
                                                    </p>
                                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed bg-white border-l-4 border-hazul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                                        • Vertical, subiendo o
                                                        bajando peldaños,
                                                        escaleras, rampas, etc.
                                                    </p>
                                                </div>
                                                <div className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                                                        EL USO, es decir, el
                                                        desarrollo de la acción
                                                        en sí, poder disfrutar,
                                                        utilizar, sacar provecho
                                                        de lo que hay a nuestro
                                                        alrededor. El uso tiene
                                                        dos estados:
                                                    </p>

                                                    <p className="text-lg text-gray-700 leading-relaxed mt-4 bg-white border-l-4 border-hazul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                                        • Preparación,
                                                        acercarse, situarse,
                                                        poder conectar con el
                                                        objeto a utilizar.
                                                    </p>
                                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed bg-white border-l-4 border-hazul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                                        • Ejecución, realización
                                                        de la actividad deseada
                                                        que es el objetivo final
                                                        de todo el proceso.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                                                    Ambos componentes son
                                                    igualmente necesarios. Es
                                                    inútil no poder desplazarse
                                                    por el interior de un baño,
                                                    no poder usar el lavabo en
                                                    silla de ruedas porque tiene
                                                    un mueble bajo que impide
                                                    acercarse. Pero tampoco se
                                                    podrá utilizar un baño
                                                    perfectamente diseñado si la
                                                    puerta de acceso es
                                                    demasiado estrecha y
                                                    obstaculiza el
                                                    desplazamiento.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-lg text-black dark:text-white/70"></footer>
                    </div>
                </div>
            </div>
        </>
    );
}
