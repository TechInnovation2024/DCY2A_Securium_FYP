/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        '0a0939': '#0a0939',
        '8cacc5': '#8cacc5',
      },
    },
  },
  
  plugins: [],
}

