/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{htlm,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

