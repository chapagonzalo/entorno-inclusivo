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
            fontFamily: {
                sans: ["Verdana", "Geneva", "Tahoma", "sans-serif"],
            },
            colors: {
                azul: "#427898",
                celeste: "#6aced3",
                verde: "#b2d77f",
                naranja: "#f79c42",
                amarillo: "#ffe170",
                blancoSuave: '#F5F5F5'
            },
        },
    },

    plugins: [forms],
};
