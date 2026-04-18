/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Forced dark mode logic
  theme: {
    extend: {
      colors: {
        background: '#0A0A0B',
        surface: '#161618',
        border: '#27272A',
        brand: {
          primary: '#CCFF00', // Neon Lime for CTAs
          secondary: '#3B82F6', // Confidence Blue
          muted: '#A1A1AA',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(204, 255, 0, 0.3)',
      },
    },
  },
  plugins: [],
};