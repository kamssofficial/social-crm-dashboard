/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 10px 30px rgba(59, 130, 246, 0.25)',
      },
      colors: {
        brand: {
          50: '#eef5ff',
          100: '#dfeeff',
          200: '#bfdcff',
          300: '#8fbfff',
          400: '#5d9cff',
          500: '#2c73ff',
          600: '#1d5ce6',
          700: '#1c4ec0',
          800: '#1d4299',
          900: '#1d3b7c',
        },
      },
    },
  },
  plugins: [],
};
