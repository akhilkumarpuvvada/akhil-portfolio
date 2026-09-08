/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#f4f4f7',
          100: '#e3e3ef',
          200: '#c0c0d6',
          300: '#9494b4',
          400: '#6b6b90',
          500: '#4c4c6f',
          600: '#373754',
          700: '#282840',
          800: '#18182b',
          900: '#100f1c',
          950: '#07070c',
        },
        accent: {
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        flare: {
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
        },
        glow: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
        },
        zest: {
          300: '#bef264',
          400: '#a3e635',
          500: '#84cc16',
        },
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'aurora-1': {
          '0%, 100%': { transform: 'translate3d(-8%, -6%, 0) scale(1)' },
          '33%': { transform: 'translate3d(12%, 8%, 0) scale(1.25)' },
          '66%': { transform: 'translate3d(-6%, 14%, 0) scale(0.9)' },
        },
        'aurora-2': {
          '0%, 100%': { transform: 'translate3d(10%, 4%, 0) scale(1.1)' },
          '50%': { transform: 'translate3d(-14%, -10%, 0) scale(0.85)' },
        },
        'aurora-3': {
          '0%, 100%': { transform: 'translate3d(0%, 10%, 0) scale(1)' },
          '50%': { transform: 'translate3d(8%, -12%, 0) scale(1.3)' },
        },
        'gradient-pan': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 1s ease forwards',
        'aurora-1': 'aurora-1 26s ease-in-out infinite',
        'aurora-2': 'aurora-2 32s ease-in-out infinite',
        'aurora-3': 'aurora-3 22s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 24s linear infinite',
      },
    },
  },
  plugins: [],
}
