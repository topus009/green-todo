const { resolve } = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const common = require('./webpack.common');

const { HOST, PORT } = process.env;
// const PROXY = `http://${HOST}:${PORT}`;

const STATIC = resolve(
  __dirname,
  '..', // [src]
  'public'
);

const colorLog = (message, color = 'white', type = 'log') => {
  console[type](`%c${message}`, `color:${color}`);
};

module.exports = () => {
  return {
    ...common,
    mode: 'development',
    output: {
      filename: 'js/bundle.js',
      publicPath: '/',
      // path: STATIC,
      path: '/dist',
      pathinfo: true,
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      port: PORT,
      host: HOST,
      contentBase: STATIC,
      // hot: true,
      // inline: true,
      historyApiFallback: true,
      // overlay: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/template.html',
        files: {
          css: ['style.css'],
          js: ['bundle.js'],
        },
      }),
      new MiniCssExtractPlugin({
        filename: 'css/styles.css',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        PRODUCTION: false,
        logg: colorLog,
      }),
      // new BrowserSyncPlugin({
      //   host: HOST,
      //   port: PORT,
      //   proxy: PROXY,
      // }),
    ],
  };
};
