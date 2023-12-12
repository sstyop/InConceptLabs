/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      textColor: {
        "green": '#3A7859',
        "blue": "#354153",
        "dark-green": "#2D6A4C"
      },
      backgroundColor: {
        'milky-white': '#F6F7F8',
        'milky-gray': '#E7EBF1',
        'green': '#3A7859',
        'dark-green': '#2D6A4C',
        'light-green': '#D4E0E0',

      },
      borderColor: {
        'drp': '#E7EBF1',
        'drp-hover': '#E1E5EC',
        'drp-active': '#95B6A9',
        'drp-selected': '#D4E0E0'
      },
      colors: {
        'light-green': '#95B6A9',
        'gray': '#C4C4C4',
        'placeholder': '#9EA0A4',
      },
      keyframes: {
        'fade-in-out': {
          '0%, 100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '50%': { opacity: '0', transform: 'translateY(20%) scale(0.1)' },
        },
        'fade-out': {
          "30%": { opacity: '0.3' },
          '100%': { opacity: '0', transform: 'translateY(20%) scale(0.1)' },
        }
      },
      animation: {
        'fade-in-out': 'fade-in-out 1s ease-out forwards',
        'fade-out': 'fade-out 0.2s ease-in forwards',
      },
      screens: {
        'xl': { 'max': '1279px' },
        'lg': { 'max': '1023px' },
        'md': { 'max': '767px' },

        //added min width query to prevent hover behaviour in touch devices
        'min-lg': { 'min-width': '1024px' },
      }
    },
  },
  plugins: [],
}