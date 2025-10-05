/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lime': {
          600: '#769802',
          700: '#5a7201',
        },
        'red': {
          600: '#C62003',
          700: '#a01a02',
        },
        'lime-light': '#DAE673',
        'black': '#101010',
        'gray': {
          100: '#F7F7F7',
        },
      },
      
      fontFamily: {
        fraunces: ['"Fraunces"', 'serif'],
      },
      spacing: {},
    },
  },
  plugins: [],
}