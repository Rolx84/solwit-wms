import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#f7f5fa',
        'bg-secondary': '#eee9f4',
        'bg-surface': '#f0ecf5',
        'purple-deep': '#3a1d6e',
        'purple-brand': '#62358F',
        'purple-bright': '#9D51E9',
        'purple-glow': '#b06aff',
        'accent': '#9D51E9',
        'accent-hover': '#62358F',
        'text-primary': '#1a1028',
        'text-secondary': '#6b5f80',
        'text-dim': '#9e93b0',
      },
      fontFamily: {
        sans: ['var(--font-fragment)', 'monospace'],
        heading: ['var(--font-fragment)', 'monospace'],
        body: ['var(--font-fragment)', 'monospace'],
        mono: ['var(--font-fragment)', 'monospace'],
      },
      borderRadius: {
        card: '16px',
        'card-sm': '12px',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'count-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', maxHeight: '0' },
          '100%': { opacity: '1', maxHeight: '500px' },
        },
        'toast-in': {
          '0%': { opacity: '0', transform: 'translateY(16px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'count-up': 'count-up 0.4s ease-out forwards',
        'slide-down': 'slide-down 0.3s ease-out forwards',
        'toast-in': 'toast-in 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
