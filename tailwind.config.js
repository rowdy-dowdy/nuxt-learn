const defaultTheme  = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.ts',
    // 'nuxt.config.ts',
    'content/**/*.md'
  ],
  theme: {
    colors: defaultTheme.colors,
    extend: {
      width: {
        '1/7': '14.285714285714286%',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
