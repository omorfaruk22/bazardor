/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e8f7ee",
          100: "#c6ebd4",
          500: "#16a34a",
          600: "#128a3e",
          700: "#0f6f32",
        },
      },
      container: { center: true, padding: "1rem" },
    },
  },
  plugins: [],
};