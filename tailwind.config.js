/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Важно для переключения тем
  theme: {
    extend: {
      colors: {
        primary: '#f8f5f0', // Светлый фон
        secondary: '#ffffff',
        accent: {
          DEFAULT: '#2f5f3b', // Основной зеленый
          hover: '#4a9e5a',
          secondary: '#b77652',
        },
        dark: {
          primary: '#0c151c', // Темный фон
          card: '#1e2d3b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
      }
    },
  },
  plugins: [],
}