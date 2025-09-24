/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
        "*.{js,ts,jsx,tsx,mdx}"
    ],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc',
        foreground: '#5f6368',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#5f6368',
        },
        primary: {
          DEFAULT: '#1A73E8',
          foreground: '#ffffff',
          hover: '#0F5BCC',
        },
        secondary: {
          DEFAULT: '#E8F0FE',
          foreground: '#5f6368',
        },
        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#5f6368',
        },
        accent: {
          DEFAULT: '#1A73E8',
          foreground: '#ffffff',
        },
        success: {
          DEFAULT: '#34A853',
          foreground: '#ffffff',
        },
        error: {
          DEFAULT: '#EA4335',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#EA4335',
          foreground: '#ffffff',
        },
        warning: {
          DEFAULT: '#F9AB00',
          foreground: '#5f6368',
        },
        neutral: {
          DEFAULT: '#5f6368',
          light: '#ffffff',
        },
        border: '#e2e8f0',
        chart: {
          '1': '#1A73E8',
          '2': '#34A853',
          '3': '#F9AB00',
          '4': '#EA4335',
          '5': '#E8F0FE',
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
            boxShadow: '0 0 20px rgba(26, 115, 232, 0.4)'
          },
          '50%': { 
            transform: 'scale(1.05)',
            boxShadow: '0 0 30px rgba(26, 115, 232, 0.6)'
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
