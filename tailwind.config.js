/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        arcade: ["Bungee", "Impact", "system-ui", "sans-serif"],
        sans: ["Nunito", "system-ui", "sans-serif"],
      },
      colors: {
        arena: "#0b0a24",
        neon: { cyan: "#22d3ee", pink: "#f472b6", lime: "#a3e635", amber: "#fbbf24" },
      },
    },
  },
  plugins: [],
};
