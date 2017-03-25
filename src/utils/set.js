const curry = require('./curry.js');

const set = curry((key, value, object) => Object.assign({}, object, {[key]: value}));

module.exports = set;
