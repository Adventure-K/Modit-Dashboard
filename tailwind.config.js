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
          550: '#E2B269',
          650: '#9B7030',
        },
        purple: {
          450: '#DC96EE',
          650: '#774983',
        },
        gray: {
          650: '#DEDEDE',
        }
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
