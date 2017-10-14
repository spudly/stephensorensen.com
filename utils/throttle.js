const throttle = (fn, delay) => {
  let lastCall;
  let returnValue;

  const callFn = args => {
    returnValue = fn(...args);
    lastCall = Date.now();
    return returnValue;
  };

  return (...args) => {
    if (!lastCall) {
      return callFn(args);
    }
    const elapsed = Date.now() - lastCall;
    if (elapsed > delay) {
      return callFn(args);
    }

    return returnValue;
  };
};

module.exports = throttle;
