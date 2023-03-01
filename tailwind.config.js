/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fade: "fade 2s;",
        fade1: "fade 1s;",
        slide: "slide 2s",
      },

      keyframes: {
        fade: {
          "0%": { opacity: 0 },
          "30%": { opacity: 0 },
          "100%": { opacity: 1 },
        },

        slide: {
          "0%": { width: "100px" },
          "100%": { width: "1000px" },
        },
      },
    },
  },
  plugins: [],
};
