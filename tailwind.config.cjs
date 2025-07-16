module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0f172a',
          800: '#1e293b'
        },
        accent: {
          DEFAULT: '#38bdf8',
          500: '#3b82f6',
          light: '#6ee7ff',
          dark: '#0891b2'
        }
      },
      boxShadow: {
        'soft': '0 4px 14px 0 rgba(0, 0, 0, 0.15)',
        'glow': '0 0 10px rgba(56, 189, 248, 0.5)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  },
  plugins: []
}