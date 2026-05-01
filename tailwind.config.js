/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', './main.tsx', './index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        app: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        elevated: 'var(--color-elevated)',
        ink: 'var(--color-text)',
        muted: 'var(--color-muted)',
        line: 'var(--color-border)',
        accent: 'var(--color-accent)',
        alkali: '#c0392b',
        alkaline: '#d35400',
        transition: '#2980b9',
        post: '#7f8c8d',
        metalloid: '#16a085',
        nonmetal: '#27ae60',
        halogen: '#8e44ad',
        noble: '#148f77',
        lanthanide: '#d68910',
        actinide: '#cb4335',
      },
    },
  },
  plugins: [],
}
