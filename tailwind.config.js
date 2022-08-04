/** @type {import('tailwindcss').Config} */
const tailwindcss = require('tailwindcss');

module.exports = {
  // content: ['./dist/*.html'],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        plBlack: "#202020",
        plDarkGrey: "#333533",
        plGrey: "#D6D6D6",
        plDarkYellow: "#fb8500",
        plYellow: "#FFEE32",
      },
      backgroundImage: {
        'wallpaper': "url('/src/assets/bg.jpg')",
      }
    },
  },
  plugins: [
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer'),
  ],
}
