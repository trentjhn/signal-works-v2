/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        sakura: {
          dark: '#0a051e',
        }
      },
      transitionTimingFunction: {
        swift: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [],
}