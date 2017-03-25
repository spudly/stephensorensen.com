const curryN = (numArgs, func) => (...args) => {
  if (args.length >= numArgs) {
    return func(...args);
  }
  return curryN(numArgs - args.length, (...nextArgs) => func(...args, ...nextArgs));
};

const curry = func => curryN(func.length, func);

module.exports = curry;
