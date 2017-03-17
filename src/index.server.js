/* eslint-disable no-console */
const pages = require('./data/pages.json');
const serveManifest = require('./middleware/serveManifest');
const serveSitemap = require('./middleware/serveSitemap');
const {version} = require('../package.json');
const {router, start, sendFile, get} = require('./utils/server');
const cacheForever = require('./middleware/cacheForever');
const gravatarProxy = require('./middleware/gravatarProxy');
const renderPage = require('./middleware/renderPage');
const logRequest = require('./middleware/logRequest');
const errorHandler = require('./middleware/errorHandler');

// eslint-disable-next-line camelcase, prefer-destructuring
const PORT = process.env.PORT || 8080;
const HOST = process.env.C9_HOSTNAME || process.env.HOST || 'localhost';
const PROTOCOL = process.env.C9_HOSTNAME ? 'https' : 'http';
// const STATIC_DIR = path.join(__dirname, '../static');

// const sendFile = file => (req, resp) => {
//   resp.header('Service-Worker-Allowed', '/').sendFile(file);
// };

const middleware = logRequest(
  errorHandler(
    router(
      get('/sitemap.txt', serveSitemap(pages)),
      get('/manifest.webmanifest', serveManifest(version)),
      get('/sw', sendFile(`${__dirname}/index.sw.js`)),
      get('/gravatar', gravatarProxy),
      get(`/${version}/js`, cacheForever, sendFile(`${__dirname}/index.client.js`)),
      get(`/${version}/css`, cacheForever, sendFile(`${__dirname}/css/index.css`)),
      ...pages.map(page => get(page.pathname, renderPage(page.pathname))),
      // router.use(`/${version}`, express.static(STATIC_DIR, {setHeaders: setCacheForeverHeaders}));
      async (response, context) => {
        if (!response.status && !response.body) {
          console.log('yo', await renderPage('/404')(response, context));
          return Object.assign({}, await renderPage('/404')(response, context), {status: 404});
        }
        return response;
      }
    )
  )
);

start(middleware, {port: PORT, hostname: HOST}).then(() => {
  console.log(`Listening @ ${PROTOCOL}://${HOST}:${PORT}`);
});
