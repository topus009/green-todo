const { resolve } = require('path');

const loaders = require('./webpack.loaders');

console.warn(process.env.NODE_ENV);

module.exports = {
  entry: {
    app: ['./src/js/index.js'],
  },
  module: {
    rules: loaders,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [resolve(__dirname, 'src/js'), 'node_modules'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  stats: {
    builtAt: false,
    version: false,
    warnings: false,
    children: false,
    // assets: false,
    modules: false,
  },
};
