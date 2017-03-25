const streamToString = async stream => new Promise((resolve, reject) => {
  let string = '';

  stream.on('data', chunk => {
    string += chunk;
  });

  stream.on('error', reject);

  stream.on('end', () => resolve(string));
});

module.exports = streamToString;
