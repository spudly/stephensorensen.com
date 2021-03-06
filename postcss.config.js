const env = require('postcss-preset-env');
const cssnano = require('cssnano');

const config = {
  plugins: [
    env({
      browsers: 'last 2 versions',
    }),
    cssnano(),
  ],
};

module.exports = config;
