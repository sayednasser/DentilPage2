/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Alexandria', 'Tajawal', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0D9488',
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#0D9488',
          600: '#0F766E',
          700: '#115E59',
          800: '#134E4A',
          900: '#0F3D38',
        },
        navy: {
          DEFAULT: '#0F172A',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        gold: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
          dark: '#D97706',
        },
        ink: {
          DEFAULT: '#111827',
          soft: '#6B7280',
        },
        surface: {
          DEFAULT: '#FAFAF9',
          card: '#FFFFFF',
          sidebar: '#0F172A',
        },
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, rgba(13,148,136,0.12) 1px, transparent 1px)',
        'luxury-glow': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(13,148,136,0.08) 0%, transparent 70%)',
        'dark-texture': 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
        'teal-gradient': 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      },
      backgroundSize: {
        'dot-sm': '24px 24px',
      },
      boxShadow: {
        card: '0 4px 24px -4px rgba(15,23,42,0.08)',
        'card-hover': '0 20px 60px -12px rgba(15,23,42,0.18)',
        luxury: '0 32px 64px -16px rgba(15,23,42,0.22)',
        floaty: '0 20px 60px -12px rgba(15,23,42,0.22)',
        glow: '0 0 40px -8px rgba(13,148,136,0.35)',
        gold: '0 8px 32px -8px rgba(245,158,11,0.4)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(28px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        pulse_slow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 1.6s linear infinite',
        pulse_slow: 'pulse_slow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
