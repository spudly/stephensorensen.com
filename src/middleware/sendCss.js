const postcss = require('postcss');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const pify = require('pify');
const fs = require('fs');
const set = require('../utils/set');
const compose = require('../utils/compose');

const readFile = pify(fs.readFile);

const cache = {};

const transpileCss = async file => {
  if (cache[file]) {
    return cache[file];
  }
  const plugins = [postcssImport, autoprefixer];
  const css = await readFile(`${__dirname}/../css/index.css`);
  const result = await postcss(plugins).process(css, {
    from: file,
    to: 'css'
  });
  cache[file] = result.css;
  return result.css;
};

const sendCss = file =>
  async response =>
    compose(set('body', await transpileCss(file)), set('status', 200), set('type', 'text/css'))(
      response
    );

module.exports = sendCss;
