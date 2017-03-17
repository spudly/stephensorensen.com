const fetch = require('node-fetch');

const gravatarProxy = async response => {
  const fetchResponse = await fetch(
    'https://www.gravatar.com/avatar/8db4c1b03b20a1b5614f8e4a2cfbc188?d=retro&r=g&s=250'
  );

  return Object.assign({}, response, {
    status: fetchResponse.status,
    type: fetchResponse.headers.get('content-type'),
    body: fetchResponse.body
  });
};

module.exports = gravatarProxy;
