/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        surface: '#1A1F2E',
        primary: '#00D09C',
        danger: '#FF4D4D'
      }
    },
  },
  plugins: [],
}
