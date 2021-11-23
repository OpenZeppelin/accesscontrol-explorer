const defaults = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: [ './src/**/*.{html,svelte}' ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      ...defaults.fontFamily,
      mono: ['Roboto Mono', ...defaults.fontFamily.mono],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
