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
      animation: {
        'snow': 'snowfall 10s linear infinite',
        'wave': 'wave 20s linear infinite',
        'wave-reverse': 'wave-reverse 25s linear infinite',
      },
      keyframes: {
        snowfall: {
          '0%': { 
            transform: 'translateY(-10vh)',
            opacity: '0.8'
          },
          '100%': { 
            transform: 'translateY(110vh)',
            opacity: '0.3'
          }
        },
        wave: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'wave-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      }
    },
  },
  plugins: [],
}