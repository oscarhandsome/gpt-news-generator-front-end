/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    // './assets/**/*.{css}',
    // './components/*.{vue,js}',
    // './components/**/*.{vue,js}',
    // './layouts/*.vue',
    // './pages/*.vue',
    // './pages/**/*.vue',
    // './plugins/**/*.{js,ts}',
    // './*.{vue,js,ts}',
    // './nuxt.config.{js,ts}',
    // 'node_modules/tailvue/dist/module.cjs',
    'node_modules/tailvue/dist/tailvue.es.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        chomsky: ['Chomsky', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
