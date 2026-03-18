/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        credible:  '#22c55e', // green-500
        dubious:   '#f59e0b', // amber-500
        dangerous: '#ef4444', // red-500
      },
    },
  },
  plugins: [],
}
