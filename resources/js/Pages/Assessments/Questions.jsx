import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/AuthenticatedLayout";
import MapaUniversidad from "../../assets/mapaUniversidad.png";
import SlopeCalculator from "./SlopeCalculator";

const Questions = () => {
    const { assessment, flash, errors } = usePage().props;
    const [answers, setAnswers] = useState({});
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (
            assessment &&
            assessment.element_instance &&
            assessment.element_instance.element
        ) {
            setQuestions(assessment.element_instance.element.questions || []);

            const initialAnswers = {};
            assessment.element_instance.element.questions.forEach(
                (question) => {
                    initialAnswers[question.id] = {
                        text: "",
                        enum: "",
                    };
                },
            );
            setAnswers(initialAnswers);

            if (assessment.answers) {
                assessment.answers.forEach((answer) => {
                    setAnswers((prev) => ({
                        ...prev,
                        [answer.question_id]: {
                            text: answer.answer_text || "",
                            enum: answer.answer_enum || "",
                        },
                    }));
                });
            }
        }
    }, [assessment]);

    const handleAnswerChange = (questionId, value) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: {
                ...prev[questionId],
                ...value,
            },
        }));
    };

    const areAllQuestionsAnswered = () => {
        return questions.every((question) => {
            const answer = answers[question.id];
            return answer.enum?.trim() !== "";
        });
    };

    const handleSubmit = (e, shouldComplete = false) => {
        e.preventDefault();
        const updatedAnswers = {};
        for (const questionId in answers) {
            updatedAnswers[questionId] = {
                ...answers[questionId],
            };
        }

        router.post(route("assessments.storeAnswers", assessment.id), {
            answers: updatedAnswers,
            complete: shouldComplete,
        });
    };

    const renderAnswerInputs = (question) => {
        return (
            <div className="space-y-6">
                <div className="bg-blancoSuave border border-gray-200 rounded-lg p-6 shadow-md">
                    {" "}
                    {/* Estilo de tarjeta consistente */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
                        {question.content}
                    </h3>
                    <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                        {question.context}
                    </p>
                    <div className="space-y-3">
                        {/* Opciones de respuesta (agrupadas para mejor organización) */}
                        {question.answer_types.map((type) => {
                            if (type === "enum_yesno") {
                                return (
                                    <div key="yesno">
                                        <label className="block text-lg font-semibold text-gray-800 mb-1">
                                            Sí/No:
                                        </label>
                                        <select
                                            value={
                                                answers[question.id]?.enum || ""
                                            }
                                            onChange={(e) =>
                                                handleAnswerChange(
                                                    question.id,
                                                    { enum: e.target.value },
                                                )
                                            }
                                            className={`block w-full p-2 border ${errors[`answers.${question.id}`] ? "border-red-500" : "border-gray-300"} rounded-md text-gray-700 focus:outline-none focus:ring-2 ${errors[`answers.${question.id}`] ? "focus:ring-red-500" : "focus:ring-indigo-500"}`}
                                        >
                                            <option value="">
                                                Selecciona una opción
                                            </option>
                                            <option value="Sí">Sí</option>
                                            <option value="No">No</option>
                                        </select>
                                        {errors[`answers.${question.id}`] && (
                                            <p className="text-red-500 text-base mt-1">
                                                {
                                                    errors[
                                                        `answers.${question.id}`
                                                    ]
                                                }
                                            </p>
                                        )}
                                    </div>
                                );
                            } else if (type === "enum_quality") {
                                return (
                                    <div key="quality">
                                        <label className="block text-lg font-semibold text-gray-800 mb-1">
                                            Calidad:
                                        </label>
                                        <select
                                            value={
                                                answers[question.id]?.enum || ""
                                            }
                                            onChange={(e) =>
                                                handleAnswerChange(
                                                    question.id,
                                                    { enum: e.target.value },
                                                )
                                            }
                                            className={`block w-full p-2 border ${errors[`answers.${question.id}`] ? "border-red-500" : "border-gray-300"} rounded-md text-gray-700 focus:outline-none focus:ring-2 ${errors[`answers.${question.id}`] ? "focus:ring-red-500" : "focus:ring-indigo-500"}`}
                                        >
                                            <option value="">
                                                Selecciona una opción
                                            </option>
                                            <option value="Bueno">Bueno</option>
                                            <option value="Regular">
                                                Regular
                                            </option>
                                            <option value="Malo">Malo</option>
                                        </select>
                                        {errors[`answers.${question.id}`] && (
                                            <p className="text-red-500 text-base mt-1">
                                                {
                                                    errors[
                                                        `answers.${question.id}`
                                                    ]
                                                }
                                            </p>
                                        )}
                                    </div>
                                );
                            } else if (type === "text") {
                                return (
                                    <div key="text">
                                        <label className="block text-lg font-semibold text-gray-800 mb-1">
                                            Observaciones (Opcional):
                                        </label>
                                        <textarea
                                            value={
                                                answers[question.id]?.text || ""
                                            }
                                            onChange={(e) =>
                                                handleAnswerChange(
                                                    question.id,
                                                    { text: e.target.value },
                                                )
                                            }
                                            className={`block w-full p-2 border ${errors[`answers.${question.id}`] ? "border-red-500" : "border-gray-300"} rounded-md text-gray-700 focus:outline-none focus:ring-2 ${errors[`answers.${question.id}`] ? "focus:ring-red-500" : "focus:ring-indigo-500"}`}
                                            rows="2"
                                        ></textarea>
                                        {errors[`answers.${question.id}`] && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors[
                                                        `answers.${question.id}`
                                                    ]
                                                }
                                            </p>
                                        )}
                                    </div>
                                );
                            }
                            return null; //Maneja tipos de respuesta desconocidos
                        })}
                        {question.id === 17 && <SlopeCalculator />}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto py-10 px-4  lg:px-8 mt-16">
                <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden mb-6">
                    {" "}
                    {flash?.success && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-lg mb-8 text-center">
                            <span className="block font-semibold">
                                {flash.success}
                            </span>
                        </div>
                    )}
                    <div className="bg-white border border-gray-200 shadow-lg overflow-hidden mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-azul p-4">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-4">
                                    Evaluación de{" "}
                                    {assessment.element_instance?.element?.name}
                                </h2>
                                <div className="text-white text-xl">
                                    <p>
                                        Ubicación:{" "}
                                        {
                                            assessment.element_instance
                                                ?.location?.name
                                        }
                                    </p>
                                    {assessment.element_instance
                                        ?.description && (
                                        <p>
                                            Descripción:{" "}
                                            {
                                                assessment.element_instance
                                                    .description
                                            }
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-center md:justify-end items-start">
                                <img
                                    src={MapaUniversidad}
                                    alt="Mapa ilustrativo de un campus universitario con diferentes edificios y zonas destacadas, identificados con números del 1 al 7. Incluye caminos, áreas verdes con árboles, estacionamientos, y espacios específicos como piscinas, plazas y entradas principales. Los edificios están representados con colores diferenciados (azul, amarillo, rojo, naranja, y púrpura) para facilitar la identificación visual de cada sección."
                                    className="max-h-40 object-contain shadow-lg rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Formulario de preguntas (usando grid) */}
                    <form className="grid grid-cols-1 md:grid-cols-1 gap-6 p-1">
                        {" "}
                        {/* Grid para distribuir preguntas */}
                        {questions.map((question) => (
                            <div key={question.id}>
                                {renderAnswerInputs(question)}
                            </div>
                        ))}
                        <div className="flex justify-end mt-10">
                            <button
                                type="button"
                                onClick={(e) => handleSubmit(e, true)}
                                className={`px-6 py-3 rounded-lg text-white font-semibold transition duration-150 ${areAllQuestionsAnswered() ? "bg-verde hover:bg-hverde" : "bg-azul hover:bg-hazul"}`}
                            >
                                {areAllQuestionsAnswered()
                                    ? "Finalizar Evaluación"
                                    : "Guardar Progreso"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};
export default Questions;
