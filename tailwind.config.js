import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontSize: {
                sm: "0.875rem", // Tamaño pequeño
                base: "1rem", // Tamaño base
                lg: "1.125rem", // Tamaño grande
                xl: "1.25rem", // Tamaño extra grande
            },
            fontFamily: {
                sans: ["Verdana", "Geneva", "Tahoma", "sans-serif"],
            },
            colors: {
                azul: "#427898",
                celeste: "#5ba5c3",
                verde: "#72a98f",
                naranja: "#f79c42",
                amarillo: "#ffe170",
                rojo: "#e74c3c",
                blancoSuave: "#F5F5F5",
                hazul: "#365e75",
                hceleste: "#4b91a3",
                hverde: "#5e8c79",
                hrojo: "#c0392b",
            },
        },
    },

    plugins: [forms],
};
