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

        if (answer.answer_numeric !== null) {
            answerValues.push(
                <div key="numeric" className="mt-2">
                    <span className="text-gray-600 font-medium">
                        Valor numérico:{" "}
                    </span>
                    <span className="text-gray-800">
                        {answer.answer_numeric}
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
        <div className="bg-white border-l-4 border-blue-500 shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
            <p className="text-lg font-semibold text-gray-900 mb-3">
                {answer.question.content}
            </p>
            <div className="space-y-2">{renderAnswerValue()}</div>
        </div>
    );
};

const AssessmentDetails = ({ assessment }) => (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">
            Detalles de la Evaluación
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Ubicación</p>
                <p className="font-semibold text-gray-900">
                    {assessment.element_instance.location.name}
                </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Elemento</p>
                <p className="font-semibold text-gray-900">
                    {assessment.element_instance.element.name}
                </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Evaluador</p>
                <p className="font-semibold text-gray-900">
                    {assessment.user.name}
                </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Estado</p>
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
                <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">
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

export default function Show({ assessment }) {
    return (
        <AuthenticatedLayout>
            <Head title="Detalles de la Evaluación" />

            <div className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Detalles de la Evaluación
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Evaluación realizada el:{" "}
                            {new Date(
                                assessment.created_at,
                            ).toLocaleDateString()}
                        </p>
                    </div>

                    {/* Detalles de la evaluación */}
                    <AssessmentDetails assessment={assessment} />

                    {/* Sección de respuestas */}
                    <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h2 className="text-xl font-bold text-gray-900">
                                Respuestas de la Evaluación
                            </h2>
                        </div>
                        <div className="p-6">
                            {assessment.answers.length > 0 ? (
                                <div className="space-y-4">
                                    {assessment.answers.map((answer) => (
                                        <ShowAnswer
                                            key={answer.id}
                                            answer={answer}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    No hay respuestas registradas para esta
                                    evaluación.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
