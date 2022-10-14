/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cyan: {
          650: '#4BC4D4',
          750: '#008592',
          850: '#008183',
        },
        yellow: {
          550: '#f1ddc0',
          650: '#E2B269',
        },
        purple: {
          450: '#DC96EE',
          650: '#774983',
        },
        gray: {
          550: '#8d8d8d',          
          650: '#DEDEDE',
        }
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
