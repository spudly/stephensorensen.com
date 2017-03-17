const errorHandler = middleware => async (response, context) => {
  try {
    return await middleware(response, context);
  } catch (error) {
    return {
      status: 500,
      body: `<pre>${error.stack}</pre>`
    };
  }
};

module.exports = errorHandler;
