const reducer = (array, value) => {
  if (Array.isArray(value)) {
    return [...array, ...value];
  }
  return [...array, value];
};

const flatten = array => array.reduce(reducer, []);

module.exports = flatten;
