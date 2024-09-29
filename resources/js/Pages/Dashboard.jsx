import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Logo from "../assets/Logo.svg";
import inicio from "../assets/inicio.png";
import Modal from "../Components/Modal";
import { useState } from "react";

export default function Dashboard() {
  const handleImageError = () => {
    document.getElementById("screenshot-container")?.classList.add("!hidden");
    document.getElementById("docs-card")?.classList.add("!row-span-1");
    document.getElementById("docs-card-content")?.classList.add("!flex-row");
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
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Bienvenido!!
        </h2>
      }
    >
      <Head title="Bienvenido/a" />

      <div className="font-sans bg-gray-100 text-black/50">
        <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
          <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
            <main className="mt-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                <a
                  onClick={() => openModal("accesibilidad")}
                  id="docs-card"
                  className="cursor-pointer flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-azul p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-celeste hover:ring-celeste focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 lg:p-10 lg:pb-10"
                >
                  <div
                    id="screenshot-container"
                    className="relative flex w-full flex-1 items-stretch"
                  >
                    <img
                      src={inicio}
                      alt="Laravel documentation screenshot"
                      className="hidden aspect-video h-full w-full flex-1 rounded-[10px] object-cover object-top drop-shadow-[0px_4px_34px_rgba(0,0,0,0.25)] dark:block"
                    />

                    <div className="absolute -bottom-16 -left-16 h-40 w-[calc(100%+8rem)] "></div>
                  </div>

                  <div className="relative flex items-center gap-6 lg:items-end">
                    <div
                      id="docs-card-content"
                      className="flex items-start gap-6 lg:flex-col"
                    >
                      <div className="pt-3 sm:pt-5 lg:pt-0">
                        <h2 className="text-xl font-semibold text-black dark:text-white">
                          Accesibilidad
                        </h2>

                        <p className="mt-4 text-sm/relaxed">
                          Las actividades de nuestra vida cotidiana son muy
                          variadas, pero las dificultades de accesibilidad que
                          surgen al llevarlas a cabo se repiten. Es conveniente,
                          por tanto, analizar estas actividades desde la óptica
                          de la accesibilidad para detectar qué tipos de
                          dificultades generan y tratar de buscar alternativas.
                          Podría decirse que, desde el punto de vista de la
                          accesibilidad, toda actividad que desarrolla una
                          persona tiene dos componentes, el desplazamiento y el
                          uso.
                        </p>
                      </div>
                    </div>

                    <svg
                      className="size-6 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#6aced3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>
                  </div>
                </a>

                <Modal
                  show={modalStates.accesibilidad}
                  onClose={() => closeModal("accesibilidad")}
                  maxWidth="4xl"
                >
                  <div className="p-6 bg-white rounded-lg shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-azul">
                        Más sobre Accesibilidad
                      </h2>
                      <button
                        onClick={() => closeModal("accesibilidad")}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-4 space-y-6">
                      <section>
                        <h3 className="text-lg font-semibold text-celeste mb-2">
                          El Desplazamiento
                        </h3>
                        <p className="text-gray-700">
                          Es el traslado hasta el lugar idóneo para realizar la
                          acción, poder moverse libremente por el entorno sin
                          limitaciones ni obstáculos. Este puede ser:
                        </p>
                        <ul className="list-disc list-inside mt-2 ml-4 text-gray-600">
                          <li>
                            Horizontal: moviéndose por pasillos, corredores,
                            dependencias, etc.
                          </li>
                          <li>
                            Vertical: subiendo o bajando peldaños, escaleras,
                            rampas, etc.
                          </li>
                        </ul>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold text-celeste mb-2">
                          El Uso
                        </h3>
                        <p className="text-gray-700">
                          Es el desarrollo de la acción en sí, poder disfrutar,
                          utilizar, sacar provecho de lo que hay a nuestro
                          alrededor. El uso tiene dos estados:
                        </p>
                        <ul className="list-disc list-inside mt-2 ml-4 text-gray-600">
                          <li>
                            Preparación: acercarse, situarse, poder conectar con
                            el objeto a utilizar.
                          </li>
                          <li>
                            Ejecución: realización de la actividad deseada que
                            es el objetivo final de todo el proceso.
                          </li>
                        </ul>
                      </section>

                      <div className="bg-azul/10 p-4 rounded-lg">
                        <p className="text-azul font-medium">
                          Ambos componentes son igualmente necesarios. Es inútil
                          poder desplazarse por el interior de un baño si no se
                          puede usar el lavabo en silla de ruedas debido a un
                          mueble bajo que impide acercarse. Igualmente, un baño
                          perfectamente diseñado no será útil si la puerta de
                          acceso es demasiado estrecha y obstaculiza el
                          desplazamiento.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => closeModal("accesibilidad")}
                        className="px-4 py-2 bg-celeste text-white rounded hover:bg-celeste/80 transition duration-300"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </Modal>

                <a
                  href="https://laracasts.com"
                  className="flex items-start gap-4 rounded-lg bg-azul p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-celeste hover:ring-celeste focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#6aced3"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                      />
                    </svg>
                  </div>

                  <div className="pt-3 sm:pt-5">
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                      Evaluaciones
                    </h2>

                    <p className="mt-4 text-sm/relaxed">
                      Por que vamos a hacer evaluaciones y quienes pueden.
                    </p>
                  </div>

                  <svg
                    className="size-6 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#6aced3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </a>

                <a
                  href="/"
                  className="flex items-start gap-4 rounded-lg bg-azul p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-celeste hover:ring-celeste focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                    <svg
                      className="size-5 sm:size-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <g fill="#6aced3">
                        <path d="M8.75 4.5H5.5c-.69 0-1.25.56-1.25 1.25v4.75c0 .69.56 1.25 1.25 1.25h3.25c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25Z" />
                        <path d="M24 10a3 3 0 0 0-3-3h-2V2.5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2V20a3.5 3.5 0 0 0 3.5 3.5h17A3.5 3.5 0 0 0 24 20V10ZM3.5 21.5A1.5 1.5 0 0 1 2 20V3a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 .5.5v17c0 .295.037.588.11.874a.5.5 0 0 1-.484.625L3.5 21.5ZM22 20a1.5 1.5 0 1 1-3 0V9.5a.5.5 0 0 1 .5-.5H21a1 1 0 0 1 1 1v10Z" />
                        <path d="M12.751 6.047h2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-2A.75.75 0 0 1 12 7.3v-.5a.75.75 0 0 1 .751-.753ZM12.751 10.047h2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-2A.75.75 0 0 1 12 11.3v-.5a.75.75 0 0 1 .751-.753ZM4.751 14.047h10a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-10A.75.75 0 0 1 4 15.3v-.5a.75.75 0 0 1 .751-.753ZM4.75 18.047h7.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-7.5A.75.75 0 0 1 4 19.3v-.5a.75.75 0 0 1 .75-.753Z" />
                      </g>
                    </svg>
                  </div>

                  <div className="pt-3 sm:pt-5">
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                      Informes
                    </h2>

                    <p className="mt-4 text-sm/relaxed">
                      Los informes que generan las evaluaciones y cual es el fin
                      de ellos
                    </p>
                  </div>

                  <svg
                    className="size-6 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#6aced3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </a>

                <a
                  href="/"
                  className="flex items-start gap-4 rounded-lg bg-azul p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-celeste hover:ring-celeste focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#6aced3"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
                      />
                    </svg>
                  </div>

                  <div className="pt-3 sm:pt-5">
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                      Cuestionarios simples
                    </h2>

                    <p className="mt-4 text-sm/relaxed">
                      Cuestionarios que pueden hacer todos, simples y con que
                      motivos link a cuestionario
                    </p>
                  </div>

                  <svg
                    className="size-6 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#6aced3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </a>
              </div>
            </main>

            <footer className="py-16 text-center text-sm text-black dark:text-white/70"></footer>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
