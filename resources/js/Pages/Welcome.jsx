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
                                    <div className="mb-6">
                                        <h1 className="text-3xl font-bold text-gray-900">
                                            Entorno Inclusivo
                                        </h1>
                                        <p className="text-gray-700 mt-2">
                                            Construyendo espacios accesibles
                                            para todos.
                                        </p>
                                    </div>

                                    {/* Sección de introducción */}
                                    <div className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                                        <div className="px-6 py-4 border-b border-gray-300 bg-azul">
                                            <h2 className="text-xl font-bold text-white">
                                                Introducción
                                            </h2>
                                        </div>
                                        <div className="p-6">
                                            <div className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
                                                <p className="text-gray-800 font-medium">
                                                    Una persona con discapacidad
                                                    enfrenta limitaciones
                                                    físicas, mentales,
                                                    sensoriales o intelectuales
                                                    que, al interactuar con
                                                    barreras sociales, pueden
                                                    dificultar su plena
                                                    participación en igualdad de
                                                    condiciones. Esto incluye
                                                    desafíos para moverse,
                                                    comunicarse o desarrollarse
                                                    en entornos sin los apoyos
                                                    necesarios.
                                                </p>
                                                <p className="text-gray-800 font-medium mt-4">
                                                    La inclusión real exige
                                                    reconocer y eliminar estas
                                                    barreras, muchas veces
                                                    basadas en prejuicios o
                                                    concepciones desactualizadas
                                                    que perpetúan prácticas
                                                    discriminatorias.
                                                </p>
                                                <p className="text-gray-800 font-medium mt-4">
                                                    Estas actitudes limitan la
                                                    autonomía y el desarrollo de
                                                    las personas con
                                                    discapacidad. Es fundamental
                                                    promover un cambio cultural
                                                    que valore la diversidad
                                                    como una riqueza y garantice
                                                    la igualdad de derechos para
                                                    todos.
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
