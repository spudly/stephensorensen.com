const http = require('http');
const {Readable} = require('stream');

exports.start = async (middleware, {port}) => {
  const server = http.createServer(async (request, nativeResponse) => {
    /* eslint-disable no-param-reassign */
    try {
      const context = {
        method: request.method,
        url: request.url
      };
      const response = await middleware({}, context);
      if (response.type) {
        nativeResponse.setHeader('Content-Type', response.type);
      }
      nativeResponse.statusCode = response.status || 500;
      if (response.body instanceof Readable) {
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

exports.router = (...middlewares) =>
  (response, context) =>
    reduceAsync(
      middlewares,
      (currentResponse, middleware) => middleware(currentResponse, context),
      response
    );

exports.get = (url, middleware) => (response, context) => {
  if (context.method === 'GET' && context.url === url) {
    return middleware(response, context);
  }
  return response;
};

exports.setHeader = (key, value) => response => Object.assign({}, response, {
  headers: Object.assign({}, response.headers, {[key]: value})
});

exports.sendFile = file => async response => {
  // TODO:
  const stream = fs.createReadStream(file);
  const mimeType = 'text/html'; // TODO: getMimeTypeSomehow(file)
  return compose(set('body', stream), setHeader('Content-Type', mimeType))(response);
};
