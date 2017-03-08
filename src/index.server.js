/* eslint-disable no-console */
const express = require('express');
const pages = require('./data/pages.json');
const path = require('path');
const requestLogger = require('./utils/requestLogger');
const serveManifest = require('./utils/serveManifest');
const serveSitemap = require('./utils/serveSitemap');
const httpRequest = require('request');
const {StaticRouter} = require('react-router-dom');
const {renderToString, renderToStaticMarkup} = require('react-dom/server');
const React = require('react');
const App = require('./widgets/App');
const MetaHtml = require('./widgets/MetaHtml');

const {Router: createRouter} = express;

// eslint-disable-next-line camelcase, prefer-destructuring
const BUILD_ID = process.env.BUILD_ID;
const PORT = process.env.PORT || 8080;
const HOST = process.env.C9_HOSTNAME || process.env.HOST || 'localhost';
const PROTOCOL = process.env.C9_HOSTNAME ? 'https' : 'http';
const STATIC_DIR = path.join(__dirname, '../static');
const app = express();

app.disable('x-powered-by');

const setCacheForeverHeaders = resp => {
  resp.header('Cache-Control', 'public, max-age=31536000, immutable');
  resp.header('Expires', new Date(Date.now() + 31536000000).toUTCString());
};

const cacheForever = (req, resp, next) => {
  setCacheForeverHeaders(resp);
  next();
};

const sendFile = file => (req, resp) => resp.sendFile(file);

const serveJs = file => (req, resp) => {
  resp.header('Service-Worker-Allowed', '/').sendFile(file);
};

const serveCss = sendFile;

const serve404 = file => (req, resp) => {
  resp.status(404).sendFile(file);
};

// eslint-disable-next-line no-unused-vars, max-len
const serve500 = file => (error, req, resp, next) => {
  console.error(error);
  resp.status(500).sendFile(file);
};

const redirect = (page, status = 301) => (req, resp) => resp.redirect(status, page);

const router = createRouter();
router.use(requestLogger);
router.get('/', redirect('/about', 303));
router.get('/sitemap.txt', serveSitemap(pages));
router.get('/manifest.webmanifest', serveManifest(BUILD_ID));
router.get('/sw', serveJs(`${__dirname}/index.sw.js`));
router.get('/gravatar', (request, response) => {
  httpRequest
    .get('https://www.gravatar.com/avatar/8db4c1b03b20a1b5614f8e4a2cfbc188?d=retro&r=g&s=250')
    .pipe(response);
});
router.get(`/${BUILD_ID}/js`, cacheForever, serveJs(`${__dirname}/index.client.js`));
router.get(`/${BUILD_ID}/css`, cacheForever, serveCss(`${__dirname}/index.css`));

router.use(`/${BUILD_ID}`, express.static(STATIC_DIR, {setHeaders: setCacheForeverHeaders}));

pages.forEach(page => {
  router.get(page.pathname, (req, resp, next) => {
    try {
      const contentHtml = renderToString(
        React.createElement(StaticRouter, {location: page.pathname}, React.createElement(App, null))
      );

      const metaElement = React.createElement(MetaHtml, {
        path: page.pathname,
        contentHtml,
        title: page.title,
      });
      resp.send(`<!doctype html>${renderToStaticMarkup(metaElement)}`);
    } catch (error) {
      next(error);
    }
  });
});
router.all('*', serve404(`${__dirname}/pages/404.html`));

app.use(router);
app.use(serve500(`${__dirname}/pages/500.html`));
app.listen(PORT, () => console.log(`Listening on ${PROTOCOL}://${HOST}:${PORT}/`));
