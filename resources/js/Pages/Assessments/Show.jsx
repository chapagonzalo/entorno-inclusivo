import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const ShowAnswer = ({ answer }) => {
    const renderAnswerValue = () => {
        const answerValues = [];

        if (answer.answer_text) {
            answerValues.push(
                <div key="text" className="mt-2">
                    <span className="text-gray-600 font-medium">
                        Observaciones:{" "}
                    </span>
                    <span className="text-gray-800">{answer.answer_text}</span>
                </div>,
            );
        }

        if (answer.answer_enum) {
            answerValues.push(
                <div key="enum" className="mt-2">
                    <span className="text-gray-600 font-medium">
                        Respuesta:{" "}
                    </span>
                    <span
                        className={`font-semibold ${
                            answer.answer_enum === "Sí"
                                ? "text-green-600"
                                : answer.answer_enum === "No"
                                  ? "text-red-600"
                                  : answer.answer_enum === "Bueno"
                                    ? "text-green-600"
                                    : answer.answer_enum === "Regular"
                                      ? "text-yellow-600"
                                      : answer.answer_enum === "Malo"
                                        ? "text-red-600"
                                        : "text-gray-800"
                        }`}
                    >
                        {answer.answer_enum}
                    </span>
                </div>,
            );
        }

        if (answerValues.length === 0 && answer.content) {
            answerValues.push(
                <div key="content" className="mt-2">
                    <span className="text-gray-800">{answer.content}</span>
                </div>,
            );
        }

        return answerValues;
    };

    return (
        <div className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
            <p className="text-xl font-semibold text-gray-900 mb-3">
                {answer.question.content}
            </p>
            <div className="space-y-2">{renderAnswerValue()}</div>
        </div>
    );
};

const AssessmentDetails = ({ assessment }) => (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidde mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-4 border-b border-gray-300 bg-azul">
            <div className="bg-azul p-4">
                <h2 className="text-xl font-bold text-white">
                    Detalles de la Evaluación
                </h2>
            </div>
            <div className="bg-azul p-4">
                <p className="text-white">
                    Evaluación realizada el:{" "}
                    {new Date(assessment.created_at).toLocaleDateString()}
                </p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="bg-blancoSuave p-4 rounded-lg border border-gray-300">
                <p className="text-gray-600 text-lg">Ubicación</p>
                <p className="font-semibold text-gray-900">
                    {assessment.element_instance.location.name}
                </p>
            </div>
            <div className="bg-blancoSuave p-4 rounded-lg border border-gray-300">
                <p className="text-gray-600 text-lg">Elemento</p>
                <p className="font-semibold text-gray-900">
                    {assessment.element_instance.element.name}
                </p>
            </div>
            <div className="bg-blancoSuave p-4 rounded-lg border border-gray-300">
                <p className="text-gray-600 text-lg">Evaluador</p>
                <p className="font-semibold text-gray-900">
                    {assessment.user.name}
                </p>
            </div>
            <div className="bg-blancoSuave p-4 rounded-lg border border-gray-300">
                <p className="text-gray-600 text-lg">Estado</p>
                <p
                    className={`font-semibold ${
                        assessment.status === "complete"
                            ? "text-green-600"
                            : "text-yellow-600"
                    }`}
                >
                    {assessment.status === "complete"
                        ? "Completado"
                        : "Incompleto"}
                </p>
            </div>
            {assessment.element_instance.description && (
                <div className="col-span-2 bg-blancoSuave p-4 rounded-lg border border-gray-300">
                    <p className="text-gray-600 text-lg">
                        Descripción del elemento
                    </p>
                    <p className="font-semibold text-gray-900 mt-1">
                        {assessment.element_instance.description}
                    </p>
                </div>
            )}
        </div>
    </div>
);

export default function Show({ assessment, questions }) {
    return (
        <AuthenticatedLayout>
            <Head title="Detalles de la Evaluación" />
            <main className="flex min-h-screen flex-col items-center justify-center mt-16">
                <div className=" w-full max-w-2xl px-6 lg:max-w-7xl bg-gray-100 rounded-lg mt-4">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {/* Detalles de la evaluación */}
                        <AssessmentDetails assessment={assessment} />

                        {/* Sección de respuestas */}
                        <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden mb-6">
                            <div className="px-6 py-4 border-b border-gray-300 bg-azul">
                                <h2 className="text-xl font-bold text-white">
                                    Respuestas de la Evaluación
                                </h2>
                            </div>
                            <div className="p-6">
                                {assessment.answers.length > 0 ? (
                                    <div className="space-y-4">
                                        {questions.map((question) => {
                                            const answer =
                                                assessment.answers.find(
                                                    (a) =>
                                                        a.question.id ===
                                                        question.id,
                                                );
                                            return (
                                                <ShowAnswer
                                                    key={question.id}
                                                    answer={
                                                        answer
                                                            ? answer
                                                            : { question }
                                                    }
                                                />
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        No hay respuestas registradas para esta
                                        evaluación.
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end mt-10">
                            <button
                                onClick={() => window.history.back()}
                                className="inline-flex items-center px-4 mr-2 py-2 bg-azul border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-hazul focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
