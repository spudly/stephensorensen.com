import {
  createServer as listen,
  composeReducers as composeRoutes,
  get,
  sendFile,
} from 'http-fantasy-land';
// import assoc from 'ramda/src/assoc';
// import fs from 'fs';

const PORT = 8080;
const serveAppCss = sendFile(`${__dirname}/../client/index.css`);

// const serveAppHtml = composeRoutes(
//   assoc('status', 200),
//   assoc('type', 'text/html'),
//   response => assoc('body', fs.createReadStream(`${__dirname}/../client/index.html`), response)
// );
//
// const serveAppCss = composeRoutes(
//   assoc('status', 200),
//   assoc('type', 'text/css'),
//   response => assoc('body', fs.createReadStream(`${__dirname}/../client/index.css`), response),
// );

const server = composeRoutes(
  get('/', sendFile(`${__dirname}/../client/index.html`)),
  get('/css', serveAppCss),
  get('/icons/medium.svg', sendFile(`${__dirname}/../client/icons/medium.svg`)),
  get('/icons/github.svg', sendFile(`${__dirname}/../client/icons/github.svg`)),
  get('/icons/stack-overflow.svg', sendFile(`${__dirname}/../client/icons/stack-overflow.svg`)),
  get('/icons/twitter.svg', sendFile(`${__dirname}/../client/icons/twitter.svg`)),
);

listen(server, {port: PORT})
  .then(() => process.stdout.write(`Listening: http://localhost:${PORT}\n`))
  .catch(error => process.stdout.write(error.stack));
