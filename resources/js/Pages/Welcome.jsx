import { Head, Link } from "@inertiajs/react";
import Logo from "../assets/Logo.svg";
import inicio from "../assets/inicio.png";
import Modal from "../Components/Modal";
import { useState } from "react";

export default function Welcome({ auth }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };
    const [modalStates, setModalStates] = useState({
        accesibilidad: false,
        evaluaciones: false,
        informes: false,
        cuestionarios: false,
    });

    const openModal = (modalName) => {
        setModalStates((prev) => ({ ...prev, [modalName]: true }));
    };

    const closeModal = (modalName) => {
        setModalStates((prev) => ({ ...prev, [modalName]: false }));
    };

    return (
        <>
            <Head title="Bienvenido/a" />
            <div className="font-sans bg-gray-100 text-black/50">
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
                                        className="rounded-md bg-celeste text-white px-4 py-2 transition duration-200 ease-in-out ring-1 ring-transparent hover:bg-celeste/80 hover:ring-azul focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D20]"
                                    >
                                        Inicio
                                    </Link>
                                ) : (
                                    <div className="flex flex-col lg:flex-row">
                                        <Link
                                            href={route("login")}
                                            className="rounded-md bg-celeste text-white px-4 py-2 transition duration-200 ease-in-out ring-1 ring-transparent hover:bg-celeste/80 hover:ring-azul focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D20] mb-2 lg:mb-0 lg:mr-2"
                                        >
                                            Ingresar
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md bg-celeste text-white px-4 py-2 transition duration-200 ease-in-out ring-1 ring-transparent hover:bg-celeste/80 hover:ring-azul focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D20]"
                                        >
                                            Registrarse
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="py-12">
                                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                    {/* Sección de Introducción */}
                                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                                        <h3 className="text-xl font-bold text-azul mb-4">
                                            Objetivo del Proyecto
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            Promover la accesibilidad y la
                                            eliminación de barreras en entornos
                                            públicos, facilitando la movilidad,
                                            comunicación y uso de espacios para
                                            personas con discapacidades y
                                            necesidades de asistencia.
                                        </p>
                                    </div>

                                    {/* Nueva Sección: Herramienta de Evaluación */}
                                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                                        {/* Propósito de la Herramienta */}
                                        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-celeste">
                                            <h3 className="text-xl font-bold text-azul mb-4">
                                                Herramienta de Evaluación de
                                                Accesibilidad
                                            </h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="font-semibold text-azul mb-2">
                                                        Propósito
                                                    </h4>
                                                    <p className="text-gray-700 leading-relaxed">
                                                        La herramienta de
                                                        evaluación de
                                                        accesibilidad permite
                                                        identificar, analizar y
                                                        registrar las barreras
                                                        físicas y sensoriales en
                                                        entornos públicos.
                                                        Desarrollada para
                                                        facilitar el diagnóstico
                                                        y mejora de espacios
                                                        inclusivos, esta
                                                        herramienta promueve la
                                                        adecuación de
                                                        infraestructura y
                                                        servicios a las
                                                        necesidades de personas
                                                        con discapacidades.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Impacto de la Herramienta */}
                                        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-verde">
                                            <h3 className="text-xl font-bold text-azul mb-4">
                                                Impacto de la Herramienta
                                            </h3>
                                            <div className="space-y-4">
                                                <p className="text-gray-700 leading-relaxed">
                                                    La herramienta de evaluación
                                                    de accesibilidad no solo
                                                    ayuda a identificar
                                                    barreras, sino que también
                                                    fomenta un cambio cultural
                                                    hacia la inclusión.
                                                    Proporciona una base para
                                                    que instituciones, empresas
                                                    y organizaciones adapten sus
                                                    espacios y servicios,
                                                    asegurando que todas las
                                                    personas puedan disfrutar de
                                                    un entorno inclusivo, seguro
                                                    y accesible.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sección de Importancia */}
                                    <div className="bg-white text-white rounded-lg shadow-md p-6">
                                        <h3 className="text-xl font-bold text-azul mb-4">
                                            Importancia de la Inclusión
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            Promover entornos accesibles no solo
                                            cumple con normativas legales, sino
                                            que también fomenta una sociedad más
                                            justa e inclusiva, donde todos
                                            puedan participar y desarrollar sus
                                            actividades en igualdad de
                                            condiciones. La diversidad y
                                            accesibilidad enriquecen las
                                            interacciones y potencian la
                                            autonomía de cada persona en el
                                            espacio público.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70"></footer>
                    </div>
                </div>
            </div>
        </>
    );
}
