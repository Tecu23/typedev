/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        background: "var(--background)",
        foreground: "var(--foreground)",

        grey: {
          comment: "var(--dark3)",
        },

        cursor: {
          DEFAULT: "var(--purple)",
        },

        error: {
          DEFAULT: "var(--red1)",
          space: "var(--red)",
        },
      },
    },
  },
  plugins: [],
};
