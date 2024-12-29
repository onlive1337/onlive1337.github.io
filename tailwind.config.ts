/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
      },
      animation: {
        'gradient': 'gradientMove 15s ease infinite',
        'snowfall': 'snowfall 10s linear infinite',
      },
      keyframes: {
        gradientMove: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        snowfall: {
          '0%': { transform: 'translateY(-10vh)' },
          '100%': { transform: 'translateY(110vh)' }
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
 }