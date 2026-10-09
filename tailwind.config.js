/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand - Teal Modern
        brand: {
          50: '#f0fdfb',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Neutrals - Zinc/Slate Foundation
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        display: ['Geist Display', 'sans-serif'],
        sans: ['Geist', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      fontSize: {
        // Display
        'display-2xl': ['72px', { lineHeight: '1.2', letterSpacing: '-1.5px' }],
        'display-xl': ['56px', { lineHeight: '1.2', letterSpacing: '-1px' }],
        'display-lg': ['48px', { lineHeight: '1.2', letterSpacing: '-1px' }],
        // Headings
        '2xl': ['32px', { lineHeight: '1.3', letterSpacing: '-0.5px' }],
        'xl': ['24px', { lineHeight: '1.4', letterSpacing: '0' }],
        'lg': ['20px', { lineHeight: '1.4', letterSpacing: '0' }],
        // Body
        'base': ['16px', { lineHeight: '1.6', letterSpacing: '0' }],
        'sm': ['14px', { lineHeight: '1.5', letterSpacing: '0' }],
        'xs': ['12px', { lineHeight: '1.4', letterSpacing: '0.5px' }],
      },
      spacing: {
        'gutter': '40px',
        'gutter-lg': '60px',
        'section': '80px',
        'section-lg': '120px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 12px rgba(20, 184, 166, 0.2)',
        'lg': '0 12px 32px rgba(0, 0, 0, 0.08)',
        'xl': '0 20px 48px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      maxWidth: {
        'container': '1400px',
        'prose': '65ch',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
