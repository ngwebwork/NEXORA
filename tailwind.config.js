/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050507',
        surface: '#0b0c10',
        'surface-alt': '#101218',
        border: 'rgba(255,255,255,0.08)',
        cyan: {
          DEFAULT: '#4CE0D2',
          soft: 'rgba(76,224,210,0.15)',
        },
        violet: {
          DEFAULT: '#7C5CFC',
          soft: 'rgba(124,92,252,0.15)',
        },
        amber: {
          DEFAULT: '#F0B90B',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(76,224,210,0.25)',
        'glow-violet': '0 0 40px rgba(124,92,252,0.25)',
        card: '0 8px 40px rgba(0,0,0,0.5)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'radial-fade': 'radial-gradient(circle at center, rgba(76,224,210,0.12) 0%, transparent 70%)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
