import {listen, composeRoutes, setHeader, get, sendFile} from 'http-fantasy-land';

const PORT = 8080;

const contentSecurityPolicy = setHeader('Content-Security-Policy');

const server = composeRoutes(
  contentSecurityPolicy("default-src 'self'; img-src 'self' www.gravatar.com"),
  get('/', sendFile(`${__dirname}/../client/index.html`)),
  get('/css', sendFile(`${__dirname}/../client/index.css`)),
  get('/icons/medium.svg', sendFile(`${__dirname}/../client/icons/medium.svg`)),
  get('/icons/github.svg', sendFile(`${__dirname}/../client/icons/github.svg`)),
  get('/icons/stack-overflow.svg', sendFile(`${__dirname}/../client/icons/stack-overflow.svg`)),
  get('/icons/twitter.svg', sendFile(`${__dirname}/../client/icons/twitter.svg`)),
  get('/icons/email.svg', sendFile(`${__dirname}/../client/icons/email.svg`)),
  get('/icons/facebook.svg', sendFile(`${__dirname}/../client/icons/facebook.svg`)),
);

listen(server, {port: PORT})
  .then(() => process.stdout.write(`Listening: http://localhost:${PORT}\n`))
  .catch(error => process.stdout.write(error.stack));
