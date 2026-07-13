/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Brand palette derived from the TGVAHAN UI (gradient + accents).
      // Tune these to match the exact brand once design tokens are finalized.
      colors: {
        brand: {
          primary: '#4f46e5', // indigo/blue Sign In button
          secondary: '#7c3aed', // purple gradient
          accent: '#f59e0b', // TGVAHAN yellow logo text
          danger: '#ef4444',
          success: '#10b981',
        },
        sidebar: {
          DEFAULT: '#111827',
          hover: '#1f2937',
          active: '#4f46e5',
        },
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, #4f46e5 0%, #7c3aed 45%, #f97316 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
