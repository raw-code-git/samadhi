/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FBF6EE',
          100: '#F4EADB',
          300: '#E3CFA8',
          500: '#C9A878',
        },
        cream: { DEFAULT: '#FAF5EC' },
        terracotta: {
          400: '#C97A57',
          500: '#B5623F',
          600: '#94492C',
        },
        clay: {
          500: '#A8472A',
          600: '#8C3A22',
        },
        olive: {
          500: '#6B7A3A',
          700: '#4D5A25',
        },
        forest: {
          700: '#2E4A3A',
          900: '#1B2E24',
        },
        gold: {
          400: '#C9A24A',
          500: '#A9862F',
        },
        ink: { DEFAULT: '#1B1F1A' },
      },
      fontFamily: {
        display: ['Cormorant', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 5vw + 1rem, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-lg': ['clamp(2rem, 3vw + 1rem, 3.5rem)', { lineHeight: '1.1' }],
        'display-md': ['clamp(1.5rem, 2vw + 0.75rem, 2.25rem)', { lineHeight: '1.15' }],
      },
      spacing: {
        section: 'clamp(3rem, 6vw, 6rem)',
      },
      maxWidth: {
        'prose-wide': '72ch',
        container: '80rem',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '16/9': '16 / 9',
      },
      boxShadow: {
        card: '0 6px 24px -12px rgb(27 47 36 / 0.25)',
        cardHover: '0 12px 40px -16px rgb(27 47 36 / 0.35)',
      },
    },
  },
  plugins: [],
};
