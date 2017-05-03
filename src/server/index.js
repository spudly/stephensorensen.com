import {listen, composeRoutes, setHeader, dir} from 'http-fantasy-land';

const PORT = 8080;

const contentSecurityPolicy = setHeader('Content-Security-Policy');

const server = composeRoutes(
  contentSecurityPolicy("default-src 'self'; img-src 'self' www.gravatar.com"),
  dir(`${__dirname}/../client`),
);

listen(server, {port: PORT})
  .then(() => process.stdout.write(`Listening: http://localhost:${PORT}\n`))
  .catch(error => process.stdout.write(error.stack));
