const set = require('../utils/set');
const compose = require('../utils/compose');
const browserify = require('browserify');
const streamToString = require('../utils/streamToString');

const cache = {};

const transpileJs = async file => {
  if (cache[file]) {
    return cache[file];
  }
  const bfy = browserify();
  bfy.add(file);
  const js = await streamToString(bfy.bundle());
  cache[file] = js;
  return js;
};

const sendJs = file =>
  async response =>
    compose(
      set('body', await transpileJs(file)),
      set('status', 200),
      set('type', 'application/javascript')
    )(response);

module.exports = sendJs;
