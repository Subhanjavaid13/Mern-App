import daisyui from 'daisyui'

/* Shared shape tokens for both themes */
const shape = {
  '--rounded-box': '1.25rem',
  '--rounded-btn': '0.875rem',
  '--rounded-badge': '1.9rem',
  '--animation-btn': '0.25s',
  '--animation-input': '0.2s',
  '--btn-focus-scale': '0.97',
  '--border-btn': '1px',
  '--tab-border': '1px',
  '--tab-radius': '0.75rem',
}

/** "Latte" — warm cream paper, chocolate ink, caramel highlights (light) */
const latte = {
  'color-scheme': 'light',
  primary: '#6B4630',
  'primary-content': '#FBF5EC',
  secondary: '#C4915F',
  'secondary-content': '#2B1B12',
  accent: '#A8774F',
  'accent-content': '#FFF9F0',
  neutral: '#3E2A1E',
  'neutral-content': '#F1E6D6',
  'base-100': '#FDFAF4',
  'base-200': '#F4ECDD',
  'base-300': '#E3D3BA',
  'base-content': '#33241A',
  info: '#6F8FB0',
  'info-content': '#F4F8FC',
  success: '#5F8F63',
  'success-content': '#F1F8F1',
  warning: '#D89E3B',
  'warning-content': '#2B1E08',
  error: '#BF5540',
  'error-content': '#FFF3F0',
  ...shape,
}

/**
 * "Espresso" — dark roast page, mocha surfaces that clearly lift off it,
 * visible cocoa borders and caramel-gold accents (dark)
 */
const espresso = {
  'color-scheme': 'dark',
  primary: '#E3B384',
  'primary-content': '#26180F',
  secondary: '#CD955F',
  'secondary-content': '#1F150E',
  accent: '#F0D6B4',
  'accent-content': '#2A1B12',
  neutral: '#F3E8D8',
  'neutral-content': '#2A1B12',
  'base-100': '#332821',
  'base-200': '#221A15',
  'base-300': '#54433A',
  'base-content': '#F6EDE0',
  info: '#96B1CE',
  'info-content': '#0F1A26',
  success: '#93C08F',
  'success-content': '#0E1C0E',
  warning: '#EBBF63',
  'warning-content': '#2A1E07',
  error: '#E4846D',
  'error-content': '#2A0F08',
  ...shape,
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="espresso"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      /* Shadows are CSS variables so each theme can tune them (see index.css) */
      boxShadow: {
        soft: 'var(--shadow-soft)',
        lift: 'var(--shadow-lift)',
        glow: '0 0 0 4px rgba(196, 145, 95, 0.25)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(3deg)' },
          '50%': { transform: 'translateY(-8px) rotate(3deg)' },
        },
        steam: {
          '0%': { opacity: '0', transform: 'translateY(6px) scaleX(1)' },
          '40%': { opacity: '0.7' },
          '100%': { opacity: '0', transform: 'translateY(-14px) scaleX(1.4)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'scale-in': 'scale-in 0.25s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        float: 'float 6s ease-in-out infinite',
        steam: 'steam 2.4s ease-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [{ latte }, { espresso }],
    darkTheme: 'espresso',
    logs: false,
  },
}
