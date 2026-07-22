/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luora-bg': '#ffffff',
        'luora-primary': '#111111',
        'luora-secondary': '#f9f9f9',
        'luora-accent': '#D4AF37',
        'luora-text': '#333333',
        'luora-muted': '#888888',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
