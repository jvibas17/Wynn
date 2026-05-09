/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'navy': {
          50:  '#f0f4f8',
          100: '#d9e2ed',
          200: '#b3c5db',
          300: '#8da8c9',
          400: '#678bb7',
          500: '#4c6e9a',
          600: '#3d587b',
          700: '#2e425c',
          800: '#1f2c3d',
          900: '#10161f',
          950: '#080b0f',
        },
        'royal': {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        'cream': {
          50:  '#fdfdfb',
          100: '#f9f8f2',
          200: '#f3f1e5',
        },
        'accent': {
          50:  '#f6f7fa',
          100: '#edf0f5',
          200: '#dbe1eb',
          300: '#bcc7db',
          400: '#97a7c7',
          500: '#7889b3',
          600: '#5f6d9a',
          700: '#4f5a7d',
          800: '#434c69',
          900: '#3b4258',
          950: '#272b3a',
        }
      },
      fontFamily: {
        serif: ['Cormorant', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'royal':  '0 0 25px rgba(139, 92, 246, 0.3)',
        'navy':   '0 0 25px rgba(8, 11, 15, 0.5)',
        'accent': '0 0 20px rgba(95, 109, 154, 0.3)',
        'purple-glow': '0 0 60px rgba(139, 92, 246, 0.35)',
      },
    },
  },
  plugins: [],
};