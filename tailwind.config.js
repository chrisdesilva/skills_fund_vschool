module.exports = {
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'secondary': '#883377',
      'primary': '#3d929c',
      'tertiary': 'rgb(246, 134, 14)',
      'purple-150': '#bef5f7', //light purple: #fce4fc
    }),
    textColor: theme => ({
      ...theme('colors'),
      'secondary': '#883377',
      'primary': '#3d929c',
      'white': '#fff' 
    }),
    borderColor: theme => ({
      ...theme('colors'),
      'secondary': '#883377',
      'primary': '#3d929c'
    }),
    extend: {}
  },
  variants: {},
  plugins: []
}
