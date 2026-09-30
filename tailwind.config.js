/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nuit d'hiver et ciel boréal
        nuit: {
          900: '#060d17',
          800: '#0c1829',
          700: '#162842',
        },
        // Vert sapin scandinave
        sapin: {
          dark: '#0a2318',
          DEFAULT: '#143c2b',
          light: '#225e43',
        },
        // Rouge baie d'hiver
        baie: {
          DEFAULT: '#b82626',
          light: '#d93838',
        },
        // Or étincelant des guirlandes
        dore: {
          light: '#ffe8a3',
          DEFAULT: '#e5b85c',
          dark: '#b38629',
        },
        // Neige et reflets givrés
        neige: {
          DEFAULT: '#f3f7fa',
          dim: '#c0d0dc',
          ice: '#7ea4be',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
