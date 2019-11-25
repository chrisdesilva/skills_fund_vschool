module.exports = {
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'secondary': '#883377',
      'primary': '#397E89',
      'tertiary': 'rgb(246, 134, 14)',
      'purple-150': '#bef5f7', //light purple: #fce4fc
    }),
    textColor: theme => ({
      ...theme('colors'),
      'secondary': '#883377',
      'primary': '#397E89',
      'white': '#fff' 
    }),
    borderColor: theme => ({
      ...theme('colors'),
      'secondary': '#883377',
      'primary': '#397E89'
    }),
    extend: {}
  },
  variants: {},
  plugins: []
}
