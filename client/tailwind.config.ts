import config from "./src/config"

export default {
    content: ["./src/**/*.{jsx,tsx}", "./*.html"],
    theme: {
        extend: {
            colors: config.interfaceColors,
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            animation: {
                "up-down": "up-down 2s ease-in-out infinite alternate",
            },
        },
    },
    plugins: [],
}