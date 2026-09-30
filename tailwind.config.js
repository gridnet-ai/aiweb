/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#FFC629',
          black: '#0A0A0A',
          white: '#FFFFFF',
          surface: '#F7F7F5',
          border: '#E8E8E4',
          muted: '#6B6B6B',
          /* Publisher demo chrome (ported from aiweb-publisher) */
          ink: '#0d0d0d',
          accent: '#8e8e8e',
          foam: '#ececec',
          alert: '#c45c4a',
          sand: '#f9f9f9',
          panel: '#171717',
          panelHover: '#212121',
          line: '#e5e5e5',
        },
        marketing: {
          navy: '#1A3A6B',
          navyDark: '#0F2347',
          navyLt: '#EEF3FB',
          green: '#15803D',
          greenDark: '#14532D',
          greenLt: '#F0FDF4',
          crimson: '#C8202F',
          crimsonDark: '#a01820',
          gold: '#C9A227',
          goldLt: '#F5C518',
          teal: '#007A8C',
          ink: '#1A1A1A',
          muted: '#5A5A5A',
          muted2: '#8A8A8A',
          border: '#E0DDD6',
          off: '#F5F5F5',
        },
      },
      fontFamily: {
        marketing: ['"Source Sans 3"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Merriweather', 'Georgia', 'serif'],
        monoMarketing: ['"Source Code Pro"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        marketing: '1200px',
      },
    },
  },
  plugins: [],
};
