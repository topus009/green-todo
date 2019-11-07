const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const POSTCSS_CONFIG_PATH = resolve(__dirname, '../.config/');
const COMMON_SASS_PATH = resolve(__dirname, '../src/styles/base');
const COMMON_SASS_RESOURSE_PATH = resolve(__dirname, '../src/styles');
const CACHE_DIR_PATH = resolve(__dirname, '.', 'node_modules', '.cache');

const withCacheLoader = name => ({
  loader: 'cache-loader',
  options: { cacheDirectory: resolve(CACHE_DIR_PATH, name) },
});

const withThreadLoader = name => ({
  loader: 'thread-loader',
  options: { name, poolRespawn: false },
});

module.exports = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    include: resolve(__dirname, '..', 'src', 'js'),
    use: [
      withCacheLoader('js'),
      withThreadLoader('js'),
      {
        loader: `babel-loader${IS_PRODUCTION ? '' : '?compact=false'}`,
        options: {
          cacheDirectory: resolve(CACHE_DIR_PATH, 'babel'),
        },
      },
    ],
  },
  {
    test: /\.(css|scss|sass)$/,
    use: [
      {
        loader: IS_PRODUCTION ? MiniCssExtractPlugin.loader : 'style-loader',
      },
      {
        loader: 'css-loader',
        options: { sourceMap: IS_PRODUCTION, importLoaders: 1 },
      },
      {
        loader: 'postcss-loader',
        options: { sourceMap: IS_PRODUCTION, config: { path: POSTCSS_CONFIG_PATH } },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: IS_PRODUCTION,
          data: `$env: ${IS_PRODUCTION ? 'prod' : 'dev'};`,
          includePaths: [COMMON_SASS_RESOURSE_PATH, COMMON_SASS_PATH, './node_modules'],
        },
      },
    ],
  },
];
