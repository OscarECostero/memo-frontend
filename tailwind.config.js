/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': { 'max': '639px' },
        ...defaultTheme.screens,
      },
      colors: {
        'orange': '#EE8030',
        'dark-blue': '#1D3557',
        'light-blue': '#457B9D',
      },
      dropShadow: {
        '3xl': '0 15px 15px rgba(255, 255, 255, 0.15)',
      }
    },
  },
  plugins: [],
};
