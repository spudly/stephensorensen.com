const cacheForever = response => Object.assign({}, response, {
  headers: Object.assign({}, response.headers, {
    'Cache-Control': 'public, max-age=31536000, immutable',
    Expires: new Date(Date.now() + 31536000000).toUTCString()
  })
});

module.exports = cacheForever;
