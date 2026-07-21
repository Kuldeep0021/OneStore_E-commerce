/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luora-bg': '#fafafa',
        'luora-primary': '#2d2d2d',
        'luora-secondary': '#e8e6e1',
        'luora-accent': '#c1a68d',
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
