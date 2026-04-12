/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "card-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        "card-float": "card-float 5.5s ease-in-out infinite",
        "card-float-slow": "card-float 6.5s ease-in-out 0.4s infinite",
        "card-float-fast": "card-float 4.8s ease-in-out 0.2s infinite",
      },
    },
  },
  plugins: [],
};