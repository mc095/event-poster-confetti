import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography'; // Ensure this is installed

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          700: '#1e293b',
          800: '#0f172a',
          900: '#020617',
        },
        yellow: {
          400: '#facc15',
        },
      },
      fontFamily: {
        sans: ['SF Pro Display', 'Open Sans', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      typography: {
        '7xl': {
          css: {
            '--tw-prose-body': '25rem',// Increased from 5rem to 6rem (96px)
            '--tw-prose-headings': '4rem',
            '--tw-prose-lead': '3.5rem', // 56px
            '--tw-prose-links': '6rem',
            '--tw-prose-bold': '6rem',
            '--tw-prose-counters': '3.5rem',
            '--tw-prose-bullets': '3.5rem',
            '--tw-prose-hr': '3.5rem',
            '--tw-prose-quotes': '6rem',
            '--tw-prose-quote-borders': '6rem',
            '--tw-prose-captions': '2.25rem', // 36px
            '--tw-prose-kbd': '3.5rem',
            '--tw-prose-code': '3.5rem',
            '--tw-prose-pre-code': '3.5rem',
            '--tw-prose-th': '6rem',
            '--tw-prose-td': '6rem',
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};

export default config;