import { useState } from "react";

function SlopeCalculator() {
    const [height, setHeight] = useState("");
    const [length, setLength] = useState("");

    // Función para calcular la pendiente en porcentaje
    const calculateSlope = () => {
        if (height && length) {
            return ((height / length) * 100).toFixed(2);
        }
        return null;
    };

    return (
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Calculadora de Pendiente
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
                Ingrese la altura y la longitud de la rampa para calcular la
                pendiente.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Entrada de Altura */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Altura (m)
                    </label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Ej. 0.5"
                    />
                </div>

                {/* Entrada de Longitud */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Longitud (m)
                    </label>
                    <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Ej. 6.0"
                    />
                </div>
            </div>

            {/* Mostrar resultado */}
            <div className="text-gray-900 mt-4 text-lg font-semibold">
                Pendiente:{" "}
                {calculateSlope() !== null ? `${calculateSlope()}%` : "N/A"}
            </div>
        </div>
    );
}

export default SlopeCalculator;
