/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F172A", // Slate 900 - Deep Navy/Black
          light: "#1E293B",   // Slate 800
        },
        gold: {
          DEFAULT: "#D4AF37", // Metallic Gold
          light: "#F4CF5D",
          dark: "#AA8C2C",
        },
        accent: {
          DEFAULT: "#8B0000", // Dark Red
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['"Lato"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
