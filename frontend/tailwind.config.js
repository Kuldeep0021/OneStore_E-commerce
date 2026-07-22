/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#ffffff',
        'brand-primary': '#000000',
        'brand-secondary': '#f3f4f6',
        'brand-accent': '#f59e0b',
        'brand-gold-dark': '#d97706',
        'brand-text': '#1f2937',
        'brand-muted': '#6b7280',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Inter"', 'sans-serif'], // Fallback serif to sans for generic look
      }
    },
  },
  plugins: [],
}
