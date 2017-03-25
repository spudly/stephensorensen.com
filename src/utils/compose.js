const compose = (...funcs) => initialValue => funcs.reduce((prev, fn) => fn(prev), initialValue);

module.exports = compose;
