const reducer = (className, value) => {
  if (typeof value === 'string') {
    return `${className} ${value}`;
  }
  if (typeof value === 'object') {
    const values = Object.keys(value).filter(key => value[key]);
    return `${className} ${values.join(' ')}`;
  }
  return className;
};

const classnames = (...args) => args.reduce(reducer, '').trim();

export default classnames;
