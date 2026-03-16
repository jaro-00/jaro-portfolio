/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: "var(--font-geist-sans)",
          mono: "var(--font-geist-mono)",
        },
      },
    },
    plugins: [],
  };
  