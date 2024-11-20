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
                {/* Bloque de pregunta y opciones de respuesta */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-md">
                    {/* Pregunta */}
                    <h2 className="text-xl font-bold text-gray-900">
                        {question.text}
                    </h2>

                    {/* Descripción opcional */}
                    {question.description && (
                        <p className="mt-1 text-lg text-gray-600">
                            {question.description}
                        </p>
                    )}

                    <div className="mt-4 space-y-3">
                        {/* Opciones de respuesta según el tipo de pregunta */}
                        {question.answer_types.includes("enum_yesno") && (
                            <div>
                                <label className="block text-lg font-semibold text-gray-800 mb-1">
                                    Sí/No:
                                </label>
                                <select
                                    value={answers[question.id]?.enum || ""}
                                    onChange={(e) =>
                                        handleAnswerChange(question.id, {
                                            enum: e.target.value,
                                        })
                                    }
                                    className={`block w-full p-2 border ${
                                        errors[`answers.${question.id}`]
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } rounded-md text-gray-700 focus:outline-none focus:ring-2 ${
                                        errors[`answers.${question.id}`]
                                            ? "focus:ring-red-500"
                                            : "focus:ring-indigo-500"
                                    }`}
                                >
                                    <option value="">
                                        Selecciona una opción
                                    </option>
                                    <option value="Sí">Sí</option>
                                    <option value="No">No</option>
                                </select>
                                {errors[`answers.${question.id}`] && (
                                    <p className="text-red-500 text-base mt-1">
                                        {errors[`answers.${question.id}`]}
                                    </p>
                                )}
                            </div>
                        )}

                        {question.answer_types.includes("enum_quality") && (
                            <div>
                                <label className="block text-xl font-semibold text-gray-800 mb-1">
                                    Calidad:
                                </label>
                                <select
                                    value={answers[question.id]?.enum || ""}
                                    onChange={(e) =>
                                        handleAnswerChange(question.id, {
                                            enum: e.target.value,
                                        })
                                    }
                                    className={`block w-full p-2 border ${
                                        errors[`answers.${question.id}`]
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } rounded-md text-gray-700 focus:outline-none focus:ring-2 ${
                                        errors[`answers.${question.id}`]
                                            ? "focus:ring-red-500"
                                            : "focus:ring-indigo-500"
                                    }`}
                                >
                                    <option value="">
                                        Selecciona una opción
                                    </option>
                                    <option value="Bueno">Bueno</option>
                                    <option value="Regular">Regular</option>
                                    <option value="Malo">Malo</option>
                                </select>
                                {errors[`answers.${question.id}`] && (
                                    <p className="text-red-500 text-base mt-1">
                                        {errors[`answers.${question.id}`]}
                                    </p>
                                )}
                            </div>
                        )}
                        {question.id === 17 ? <SlopeCalculator /> : ""}

                        {question.answer_types.includes("text") && (
                            <div>
                                <label className="block text-xl font-semibold text-gray-800 mb-1">
                                    Observaciones (Opcional):
                                </label>
                                <textarea
                                    value={answers[question.id]?.text || ""}
                                    onChange={(e) =>
                                        handleAnswerChange(question.id, {
                                            text: e.target.value,
                                        })
                                    }
                                    className={`block w-full p-2 border ${
                                        errors[`answers.${question.id}`]
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } rounded-md text-gray-700 focus:outline-none focus:ring-2 ${
                                        errors[`answers.${question.id}`]
                                            ? "focus:ring-red-500"
                                            : "focus:ring-indigo-500"
                                    }`}
                                    rows="2"
                                />
                                {errors[`answers.${question.id}`] && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors[`answers.${question.id}`]}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Layout>
            <div className="max-w-full xl:max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                {/* Notificación de éxito */}
                {flash?.success && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-lg mb-8 text-center">
                        <span className="block font-semibold">
                            {flash.success}
                        </span>
                    </div>
                )}

                {/* Cabecera de Evaluación */}
                <div className="bg-gray-50 shadow-md rounded-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Evaluación de{" "}
                        {assessment.element_instance?.element?.name}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2 text-gray-700 text-xl leading-relaxed">
                            <p>
                                <span className="font-semibold">
                                    Ubicación:
                                </span>{" "}
                                {assessment.element_instance?.location?.name}
                            </p>
                            {assessment.element_instance?.description && (
                                <p>
                                    <span className="font-semibold">
                                        Descripción:
                                    </span>{" "}
                                    {assessment.element_instance.description}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-center md:justify-end items-start">
                            <img
                                src={MapaUniversidad}
                                alt="Mapa de ubicación"
                                className="max-h-40 object-contain shadow-lg rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Formulario de preguntas */}
                <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {questions.map((question) => (
                            <div
                                key={question.id}
                                className="bg-white shadow-md rounded-lg p-6"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
                                    {question.content}
                                </h3>
                                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                                    {question.context}
                                </p>
                                {/* Renderizado de inputs de respuesta */}
                                {renderAnswerInputs(question)}
                            </div>
                        ))}
                    </div>
                    {/* Botones de acción */}
                    <div className="flex justify-end mt-10">
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e, true)}
                            className={`px-6 py-3 rounded-lg text-white font-semibold transition duration-150 ${
                                areAllQuestionsAnswered()
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {areAllQuestionsAnswered()
                                ? "Finalizar Evaluación"
                                : "Guardar Progreso"}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Questions;
