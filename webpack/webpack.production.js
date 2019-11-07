const { resolve } = require('path');
const webpack = require('webpack');

const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const common = require('./webpack.common');

const STATIC = resolve(
  __dirname,
  '..', // [src]
  'public'
);

module.exports = () => {
  return {
    ...common,
    mode: 'production',
    output: {
      filename: 'js/[name].[hash].js',
      publicPath: '/public',
      path: STATIC,
    },
    performance: { hints: false },
    // devtool: 'source-map',
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: false,
          terserOptions: {
            output: {
              comments: false,
            },
            compress: {
              drop_console: true,
              booleans_as_integers: true,
              warnings: true,
            },
            mangle: {
              keep_classnames: true,
            },
          },
        }),
      ],
      splitChunks: {
        chunks: 'async',
        automaticNameDelimiter: '.',
        cacheGroups: {
          vendor: {
            name: 'app.vendors',
            filename: 'js/app.vendors.[hash].js',
            test: module => /[\\/]node_modules[\\/]/.test(module.context),
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: '../public/index.html',
        template: './src/template.html',
        title: 'Megafon',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/styles.[hash].css',
      }),
      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'static',
      //   generateStatsFile: true,
      //   statsFilename: '../bundle-report/stats.json',
      //   reportFilename: '../bundle-report/report.html',
      //   openAnalyzer: false,
      // }),
      new webpack.DefinePlugin({ PRODUCTION: true }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['js/*.*', 'css/*.*'],
      }),
      new WebpackBar(),
    ],
  };
};
