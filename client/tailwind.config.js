const { nextui } = require("@nextui-org/react");
const dracula = require("tailwind-dracula");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...dracula.colors,
      },
      fontFamily: {
        Courgette: ["Courgette", "cursive"],
        Caveat: ["Caveat", "cursive"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("tailwind-dracula")("dracula", true)],
};
