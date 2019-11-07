module.exports = {
  plugins: [
    require('autoprefixer'),
    require('css-mqpacker'),
    require('cssnano')({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
          colormin: false,
          convertValues: {
            length: false,
            angle: false,
          },
        },
      ],
    }),
  ],
};
