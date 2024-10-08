/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}',
            "./node_modules/flowbite/**/*.js"
            ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    fontFamily: {
    },
    extend: {}
  },
  plugins: [require('flowbite/plugin')]
};