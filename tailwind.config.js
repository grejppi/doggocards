module.exports = {
  theme: {
    extend: {
      width: {
        '4x24': `${4 * 6}rem`,
        '4x32': `${4 * 8}rem`,
        '4x48': `${4 * 12}rem`,
        'screen-quarter': '25vw',
      },
      height: {
        '4x24': `${4 * 6}rem`,
        '4x32': `${4 * 8}rem`,
        '4x48': `${4 * 12}rem`,
        'screen-w': '100vw',
        'screen-w-quarter': '25vw',
      },
      inset: {
        '1/2': '50%',
      },
      margin: {
        'screen-relative': '1.5vw',
      },
      padding: {
        'screen-relative': '1.5vw',
      },
    },
  },
  variants: {},
  plugins: [],
};
