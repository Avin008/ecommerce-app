/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const scrollbarHide = require("tailwind-scrollbar-hide");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ["sans"]: ["Lato", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [scrollbarHide],
};
