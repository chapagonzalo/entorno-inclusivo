import { Head, Link } from "@inertiajs/react";
import Logo from "../assets/Logo.svg";
import Inicio from "../assets/inicio.png";
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                        {/* Sección de introducción */}
                                        <div className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                                            <div className="px-6 py-4 border-b border-gray-300 bg-azul">
                                                <h2 className="text-3xl font-bold text-white">
                                                    Entorno Inclusivo
                                                </h2>
                                            </div>
                                            <div className="p-6">
                                                <div className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                                                        Una persona con
                                                        discapacidad enfrenta
                                                        limitaciones físicas,
                                                        mentales, sensoriales o
                                                        intelectuales que, al
                                                        interactuar con barreras
                                                        sociales, pueden
                                                        dificultar su plena
                                                        participación en
                                                        igualdad de condiciones.
                                                        Esto incluye desafíos
                                                        para moverse,
                                                        comunicarse o
                                                        desarrollarse en
                                                        entornos sin los apoyos
                                                        necesarios.
                                                    </p>
                                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                                                        La inclusión real exige
                                                        reconocer y eliminar
                                                        estas barreras, muchas
                                                        veces basadas en
                                                        prejuicios o
                                                        concepciones
                                                        desactualizadas que
                                                        perpetúan prácticas
                                                        discriminatorias.
                                                    </p>
                                                    <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                                                        Estas actitudes limitan
                                                        la autonomía y el
                                                        desarrollo de las
                                                        personas con
                                                        discapacidad. Es
                                                        fundamental promover un
                                                        cambio cultural que
                                                        valore la diversidad
                                                        como una riqueza y
                                                        garantice la igualdad de
                                                        derechos para todos.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center relative">
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-200 opacity-25 rounded-lg"></div>
                                            <img
                                                src={Inicio}
                                                alt="Ilustración de accesibilidad universal que muestra a diversas personas en situaciones cotidianas, incluyendo una mujer embarazada, un adulto mayor con bastón, un hombre con prótesis, una persona con discapacidad visual con bastón blanco, personas en sillas de ruedas y una mujer empujando un cochecito de bebé. La imagen también incluye elementos como rampas, escaleras y obstáculos señalados para enfatizar la importancia de un diseño accesible."
                                                className="rounded-lg shadow-lg border border-gray-300 relative"
                                            />
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
                                                        cumple con normativas
                                                        legales, sino que
                                                        también fomenta una
                                                        sociedad más justa e
                                                        inclusiva, donde todos
                                                        puedan participar y
                                                        desarrollar sus
                                                        actividades en igualdad
                                                        de condiciones. La
                                                        diversidad y
                                                        accesibilidad enriquecen
                                                        las interacciones y
                                                        potencian la autonomía
                                                        de cada persona en el
                                                        espacio público.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
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
