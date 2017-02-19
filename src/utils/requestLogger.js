/* eslint-disable no-console */

const requestLogger = (req, resp, next) => {
  next(); // eslint-disable-line callback-return
  console.log(`[${String(new Date())}] ${req.url} => ${resp.statusCode}`);
};

export default requestLogger;
