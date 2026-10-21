/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030712',
          900: '#060d1d',
          850: '#0a142c',
          800: '#0e1d3e',
          700: '#152952',
          600: '#1d3972'
        },
        solar: {
          orange: '#ff6b35',
          gold: '#ffb703',
          glow: '#ffa200'
        },
        cosmic: {
          cyan: '#00f0ff',
          blue: '#3b82f6',
          violet: '#8b5cf6',
          accent: '#06b6d4'
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
      }
    },
  },
  plugins: [],
}
