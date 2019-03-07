const env = require('postcss-preset-env');
const cssnano = require('cssnano');

const config = {
  plugins: [
    env({
      browsers: 'last 2 versions',
    }),
  ],
};

if (process.env.NODE_ENV !== 'development') {
  config.plugins.push(cssnano());
}

module.exports = config;
