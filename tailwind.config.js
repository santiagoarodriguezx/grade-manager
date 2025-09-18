/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc',
        foreground: '#1e293b',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#1e293b',
        },
        primary: {
          DEFAULT: '#10b981',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#6ee7b7',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#64748b',
        },
        accent: {
          DEFAULT: '#6ee7b7',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        border: '#e2e8f0',
        chart: {
          '1': '#10b981',
          '2': '#6ee7b7',
          '3': '#1e293b',
          '4': '#f59e0b',
          '5': '#06b6d4',
        },
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
          },
          '50%': { 
            transform: 'scale(1.05)',
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.6)'
          },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}