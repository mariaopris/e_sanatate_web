/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer"), require("daisyui")],
}
