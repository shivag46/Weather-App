/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing:{
        '100':'1000px',
      },
      backgroundImage:{
        'bg-pic': "url('/src/pic.jpg')",
      },
      boxShadow: {
        'custom': '0 0 20px rgba(0,0,0,.1)'
      }
    },
  },
  plugins: [],
}