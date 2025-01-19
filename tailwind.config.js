/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ap-red': 'rgb(var(--ap-red))',
        'ap-red-dark': 'rgb(var(--ap-red-dark))',
        dark: {
          DEFAULT: 'rgb(var(--card-bg))',
          lighter: 'rgb(var(--input-bg))',
          border: 'rgb(var(--card-border))',
        },
        text: {
          primary: 'rgb(var(--text-primary))',
          secondary: 'rgb(var(--text-secondary))',
        }
      },
      backgroundColor: {
        'dark-gradient-start': 'rgb(var(--background-start-rgb))',
        'dark-gradient-end': 'rgb(var(--background-end-rgb))',
      }
    },
  },
  plugins: [],
} 