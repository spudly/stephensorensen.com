const http = require('http');
const fs = require('fs');
const set = require('./set');
const compose = require('./compose');

const INITIAL_RESPONSE = {
  status: 404,
  body: 'Not Found',
  headers: {'Content-Type': 'text/plain'}
};

exports.start = async (middleware, {port}) => {
  const server = http.createServer(async (request, nativeResponse) => {
    /* eslint-disable no-param-reassign */
    try {
      const context = {
        method: request.method,
        url: request.url
      };
      const response = await middleware(INITIAL_RESPONSE, context);
      if (response.type) {
        nativeResponse.setHeader('Content-Type', response.type);
      }
      nativeResponse.statusCode = response.status || 500;
      if (response.body && typeof response.body.pipe === 'function') {
        response.body.pipe(nativeResponse);
      } else if (typeof response.body === 'string') {
        nativeResponse.end(response.body);
      } else {
        throw Error('Invalid/Unset response body');
      }
    } catch (error) {
      nativeResponse.statusCode = 500;
      nativeResponse.end(error.stack);
    }
    /* eslint-enable no-param-reassign */
  });

  const stop = server.close();

  return new Promise((resolve, reject) => {
    server.listen(port).on('listening', () => resolve(stop)).once('error', reject);
  });
};

const reduceAsync = async (array, reducer, initialValue) => {
  let value = initialValue;
  for (let i = 0; i < array.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    value = await reducer(value, array[i]);
  }
  return value;
};

const combineMiddlewares = (exports.combineMiddlewares = (exports.router = (...middlewares) =>
  (response, context) =>
    reduceAsync(
      middlewares,
      (currentResponse, middleware) => middleware(currentResponse, context),
      response
    )));

exports.get = (url, ...middlewares) => (response, context) => {
  if (context.method === 'GET' && context.url === url) {
    return combineMiddlewares(...middlewares)(response, context);
  }
  return response;
};

exports.sendFile = file => async response => {
  const stream = fs.createReadStream(file);
  const mimeType = 'text/html'; // TODO: getMimeTypeSomehow(file)
  return compose(set('body', stream), set('status', 200), set('type', mimeType))(response);
};
