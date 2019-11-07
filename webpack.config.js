const production = require('./webpack/webpack.production');
const development = require('./webpack/webpack.development');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = IS_PRODUCTION ? production : development;
