/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C66E52',
          light: '#D98B74',
          dark: '#A55540',
        },
        secondary: {
          DEFAULT: '#E9B63B',
          light: '#F0C96D',
          dark: '#D19A1F',
        },
        accent: {
          DEFAULT: '#ECD5BC',
          light: '#F5E8D9',
          dark: '#D9BFA0',
        },
        neutral: {
          DEFAULT: '#758A93',
          light: '#A0B3BC',
          dark: '#5A6D76',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

