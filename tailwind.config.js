/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "rgb(var(--background))",
          highlight: "rgb(var(--background-highlight))",
          dark: "rgb(var(--background-dark))",
          keybind: "rgb(var(--background-keybind))",
        },
        foreground: "rgb(var(--foreground))",

        untyped: "rgb(var(--untyped))",

        cursor: {
          DEFAULT: "rgb(var(--cursor))",
        },

        error: {
          DEFAULT: "rgb(var(--error))",
          space: "rgb(var(--error-extra))",
        },
      },
    },
  },
  plugins: [],
};
