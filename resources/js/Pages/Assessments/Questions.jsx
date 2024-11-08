import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/AuthenticatedLayout";
import MapaUniversidad from "../../assets/mapaUniversidad.png";

const Questions = () => {
    const { assessment, flash } = usePage().props;
    const [answers, setAnswers] = useState({});
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (
            assessment &&
            assessment.element_instance &&
            assessment.element_instance.element
        ) {
            setQuestions(assessment.element_instance.element.questions || []);

            // Cargar respuestas existentes
            if (assessment.answers) {
                const existingAnswers = {};
                assessment.answers.forEach((answer) => {
                    existingAnswers[answer.question_id] = {
                        text: answer.answer_text || "",
                        enum: answer.answer_enum || "",
                        numeric: answer.answer_numeric || "",
                        quality: answer.answer_enum || "",
                    };
                });
                setAnswers(existingAnswers);
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

    const handleSubmit = (e, shouldComplete = false) => {
        e.preventDefault();
        router.post(route("assessments.storeAnswers", assessment.id), {
            answers,
            complete: shouldComplete,
        });
    };

    const handleSaveAndExit = (e) => {
        e.preventDefault();
        handleSubmit(e, false);
        router.get(route("assessments.index"));
    };

    const renderAnswerInputs = (question) => {
        return (
            <div className="space-y-4">
                {question.answer_types.includes("enum_yesno") && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Sí/No:
                        </label>
                        <select
                            value={answers[question.id]?.enum || ""}
                            onChange={(e) =>
                                handleAnswerChange(question.id, {
                                    enum: e.target.value,
                                })
                            }
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="Sí">Sí</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                )}

                {question.answer_types.includes("enum_quality") && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Calidad:
                        </label>
                        <select
                            value={answers[question.id]?.quality || ""}
                            onChange={(e) =>
                                handleAnswerChange(question.id, {
                                    quality: e.target.value,
                                })
                            }
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="Bueno">Bueno</option>
                            <option value="Regular">Regular</option>
                            <option value="Malo">Malo</option>
                        </select>
                    </div>
                )}

                {question.answer_types.includes("numeric") && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Valor numérico:
                        </label>
                        <input
                            type="number"
                            value={answers[question.id]?.numeric || ""}
                            onChange={(e) =>
                                handleAnswerChange(question.id, {
                                    numeric: e.target.value,
                                })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                )}

                {question.answer_types.includes("text") && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Observaciones adicionales:
                        </label>
                        <textarea
                            value={answers[question.id]?.text || ""}
                            onChange={(e) =>
                                handleAnswerChange(question.id, {
                                    text: e.target.value,
                                })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            rows="3"
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {flash?.success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                        <span className="block sm:inline">{flash.success}</span>
                    </div>
                )}

                {/* Cabecera con información */}
                <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Evaluación de{" "}
                                {assessment.element_instance?.element?.name}
                            </h2>
                            <div className="space-y-2">
                                <p className="text-gray-600">
                                    <span className="font-medium">
                                        Ubicación:
                                    </span>{" "}
                                    {
                                        assessment.element_instance?.location
                                            ?.name
                                    }
                                </p>
                                {assessment.element_instance?.description && (
                                    <p className="text-gray-600">
                                        <span className="font-medium">
                                            Descripción:
                                        </span>{" "}
                                        {
                                            assessment.element_instance
                                                .description
                                        }
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center items-start">
                            <img
                                src={MapaUniversidad}
                                alt="Mapa de ubicación"
                                className="max-h-48 object-contain"
                            />
                        </div>
                    </div>
                </div>

                <form className="space-y-6">
                    {/* Lista de preguntas */}
                    {questions.map((question) => (
                        <div
                            key={question.id}
                            className="bg-white shadow overflow-hidden sm:rounded-lg"
                        >
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {question.content}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    {question.context}
                                </p>
                                {renderAnswerInputs(question)}
                            </div>
                        </div>
                    ))}

                    {/* Botones de acción */}
                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={handleSaveAndExit}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                        >
                            Guardar y Salir
                        </button>
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e, true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Finalizar Evaluación
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Questions;
