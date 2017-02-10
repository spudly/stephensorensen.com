/* eslint-disable no-console */
import express, {Router as createRouter} from 'express';
import path from 'path';
import {pages} from '../data.json';
import {hash} from '../build/buildData.json';

const app = express();

const PORT = process.env.PORT || 8080;
const HOST = process.env.C9_HOSTNAME || process.env.HOST || 'localhost';
const PROTOCOL = process.env.C9_HOSTNAME ? 'https' : 'http';
const BUILD = path.resolve(__dirname, '../build');

const sendFile = file => (req, resp) => resp.sendFile(file);
const serveHtml = file => (req, resp) => {
  resp.header('Service-Worker-Allowed', '/').sendFile(file);
};
const serveJs = file => (req, resp) => {
  resp.header('Service-Worker-Allowed', '/').sendFile(file);
};
const serveCss = sendFile;
const serveTxt = sendFile;

const serveManifest = file => (req, resp) =>
  resp
    .type('application/manifest+json')
    .sendFile(file);

const serve404 = file => (req, resp) => {
  resp.status(404).sendFile(file);
};

const serve500 = file => (error, req, resp, next) => {// eslint-disable-line no-unused-vars, max-len
  console.error(error);
  resp.status(500).sendFile(file);
};

const router = createRouter();
router.get('/', (req, resp) => resp.redirect(303, '/about'));
router.get('/sitemap.txt', serveTxt(`${BUILD}/sitemap.txt`));
router.get('/manifest.webmanifest', serveManifest(`${BUILD}/manifest.webmanifest`));
router.get(`/${hash}/js`, serveJs(`${BUILD}/index.js`));
router.get(`/${hash}/css`, serveCss(`${BUILD}/index.css`));
router.get(`/${hash}/serviceWorker.js`, serveJs(`${BUILD}/serviceWorker.js`));
router.get('/images/*', (req, resp, next) => {
  const file = `${BUILD}/images/${req.url.replace('/images/', '')}`;
  resp.sendFile(file, (error) => {
    if (error) {
      console.log(error);
      if (error.code === 'ENOENT') {
        next(); // 404
      } else {
        next(error); // 500
      }
    }
  });
});

Object.keys(pages).forEach(
  pathname => router.get(pathname, serveHtml(`${BUILD}/pages${pathname}.html`))
);

router.all('*', serve404(`${BUILD}/pages/404.html`));

app.use(router);
app.use(serve500(`${BUILD}/pages/500.html`));
app.listen(PORT, () => console.log(`Listening on ${PROTOCOL}://${HOST}:${PORT}/`));
