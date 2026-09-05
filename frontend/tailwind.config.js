import daisyui from 'daisyui'

/* Shared shape tokens for both themes — compact, professional radii */
const shape = {
  '--rounded-box': '0.875rem',
  '--rounded-btn': '0.625rem',
  '--rounded-badge': '1.9rem',
  '--animation-btn': '0.2s',
  '--animation-input': '0.2s',
  '--btn-focus-scale': '0.98',
  '--border-btn': '1px',
  '--tab-border': '1px',
  '--tab-radius': '0.5rem',
}

/** Brand accents shared by both themes: bright orange, amber, peach */
const brand = {
  primary: '#FF8A3D',
  'primary-content': '#231205',
  secondary: '#FFAD62',
  'secondary-content': '#231205',
  accent: '#FFC98F',
  'accent-content': '#231205',
}

/** "Latte" — cream paper, warm brown text, orange accents (light) */
const latte = {
  'color-scheme': 'light',
  ...brand,
  neutral: '#3E2A1E',
  'neutral-content': '#F6EEE2',
  'base-100': '#FFFCF7',
  'base-200': '#F6EFE4',
  'base-300': '#E6DAC6',
  'base-content': '#33241A',
  info: '#6F8FB0',
  'info-content': '#F4F8FC',
  success: '#5F8F63',
  'success-content': '#F1F8F1',
  warning: '#D89E3B',
  'warning-content': '#2B1E08',
  error: '#C4573F',
  'error-content': '#FFF3F0',
  ...shape,
}

/** "Espresso" — warm charcoal page, graphite surfaces, orange accents (dark) */
const espresso = {
  'color-scheme': 'dark',
  ...brand,
  neutral: '#F4EFE8',
  'neutral-content': '#1B1815',
  'base-100': '#201D1A',
  'base-200': '#141210',
  'base-300': '#3B3631',
  'base-content': '#F4EFE8',
  info: '#A9BFCF',
  'info-content': '#0F1A22',
  success: '#8FCB8A',
  'success-content': '#0B1C0B',
  warning: '#F6C453',
  'warning-content': '#2A1E05',
  error: '#F27B64',
  'error-content': '#2A0C06',
  ...shape,
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="espresso"]'],
  theme: {
    extend: {
      /* Inter everywhere (self-hosted via @fontsource-variable/inter) with a solid system fallback stack */
      fontFamily: {
        sans: [
          '"Inter Variable"',
          '"Inter"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        display: [
          '"Inter Variable"',
          '"Inter"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      /* Shadows are CSS variables so each theme can tune them (see index.css) */
      boxShadow: {
        soft: 'var(--shadow-soft)',
        lift: 'var(--shadow-lift)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.35s ease-out both',
        'fade-in': 'fade-in 0.3s ease-out both',
        'scale-in': 'scale-in 0.18s ease-out both',
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
