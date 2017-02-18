/* eslint-disable no-console */
import express, {Router as createRouter} from 'express';
import path from 'path';
import {pages} from '../data.json';
import {hash} from '../build/buildData.json';

const app = express();

app.disable('x-powered-by');

const PORT = process.env.PORT || 8080;
const HOST = process.env.C9_HOSTNAME || process.env.HOST || 'localhost';
const PROTOCOL = process.env.C9_HOSTNAME ? 'https' : 'http';
const BUILD = path.resolve(__dirname, '../build');

const cacheForever = (req, resp, next) => {
  resp.header('Cache-Control', 'public, max-age=31536000, immutable');
  resp.header('Expires', new Date(Date.now() + 31536000000).toUTCString());
  next();
};

const sendFile = file => (req, resp) => resp.sendFile(file);

const serveHtml = file => (req, resp) => {
  resp.header('Service-Worker-Allowed', '/').sendFile(file);
};

const serveJs = file => (req, resp) => {
  resp.header('Service-Worker-Allowed', '/').sendFile(file);
};

const serveCss = sendFile;

const serveTxt = sendFile;

const serveManifest = file =>
  (req, resp) => resp.type('application/manifest+json').sendFile(file);

const serve404 = file => (req, resp) => {
  resp.status(404).sendFile(file);
};

// eslint-disable-next-line no-unused-vars, max-len
const serve500 = file => (error, req, resp, next) => {
  console.error(error);
  resp.status(500).sendFile(file);
};

const redirect = (page, status = 301) =>
  (req, resp) => resp.redirect(status, page);

const router = createRouter();
router.use(`/${hash}`, cacheForever);
router.get('/', redirect('/about', 303));
router.get('/sitemap.txt', serveTxt(`${BUILD}/sitemap.txt`));
router.get(
  '/manifest.webmanifest',
  serveManifest(`${BUILD}/manifest.webmanifest`),
);
router.get(`/${hash}/js`, serveJs(`${BUILD}/index.js`));
router.get(`/${hash}/css`, serveCss(`${BUILD}/index.css`));
router.get('/serviceWorker.js', serveJs(`${BUILD}/serviceWorker.js`));
router.get('/images/*', (req, resp, next) => {
  const file = `${BUILD}/images/${req.url.replace('/images/', '')}`;
  resp.sendFile(file, error => {
    if (error) {
      console.log(error);
      if (error.code === 'ENOENT') {
        next(); // 404
        return;
      }
      next(error); // 500
    }
  });
});

Object.keys(pages)
  .forEach(pathname =>
    router.get(pathname, serveHtml(`${BUILD}/pages${pathname}.html`)));

router.all('*', serve404(`${BUILD}/pages/404.html`));

app.use(router);
app.use(serve500(`${BUILD}/pages/500.html`));
app.listen(PORT, () =>
  console.log(`Listening on ${PROTOCOL}://${HOST}:${PORT}/`));
