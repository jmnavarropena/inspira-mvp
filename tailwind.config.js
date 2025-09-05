/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta corporativa CL Grupo Industrial
        primary: {
          100: "#d4eaf7",
          200: "#b6ccd8",
          300: "#3b3c3d",
          500: "#1badfa", // accent-100 como primary principal
          600: "#005295", // accent-200
        },
        accent: {
          100: "#1badfa",
          200: "#005295",
        },
        text: {
          100: "#1d1c1c",
          200: "#313d44",
        },
        bg: {
          100: "#fffefb",
          200: "#f5f4f1",
          300: "#cccbc8",
        },
        // Mantenemos algunos colores base para estados
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
