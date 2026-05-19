/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'dark-bg': '#09090b',
        'dark-card': '#18181b',
        'dark-border': '#27272a',
        'dark-sidebar': '#060607',
        'primary': '#8b5cf6', 
      },
    },
  },
  plugins: [],
}