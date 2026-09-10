/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f2f9f1',
          100: '#e1f2df',
          500: '#16a34a',
          600: '#15803d',
          700: '#166534',
          800: '#14532d',
          900: '#0e3a1f',
        },
        doca: {
          50: '#f0f7ff',
          500: '#1d4ed8',
          700: '#1e40af',
          900: '#1e3a8a',
        }
      }
    },
  },
  plugins: [],
}
