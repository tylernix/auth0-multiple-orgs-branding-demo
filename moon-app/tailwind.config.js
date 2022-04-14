module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'moon-landscape': "url('/img/moon-landscape.jpg')"
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
