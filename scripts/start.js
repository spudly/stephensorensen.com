const express = require('express');
const path = require('path');
const {pages} = require('../data.json');
const {hash} = require('../build/buildData.json')

const app = express();

const PORT = process.env.PORT || 8080;
const HOST = process.env.C9_HOSTNAME || process.env.HOST || 'localhost';
const PROTOCOL = process.env.C9_HOSTNAME ? 'https' : 'http';


const sendFile = file => (req, resp) => resp.sendFile(path.resolve(__dirname, '..', file));
const serveHtml = sendFile;
const serveJs = sendFile;
const serveCss = sendFile;
const serveTxt = sendFile;

const serve404 = file => (req, resp) => {
  resp.status(404).send('404');
  //resp.status(404).sendFile(file);
};
const serve500 = file => (error, req, resp, next) => {
  console.log(error);
  resp.status(500).send('500');
  //resp.status(500).sendFile(file);
};

const router = express.Router();
router.get('/', (req, resp) => resp.redirect(303, '/about'));
router.get('/sitemap.txt', serveTxt('build/sitemap.txt'));
router.get(`/${hash}/js`, serveJs('build/index.js'));
router.get(`/${hash}/css`, serveCss('build/index.css'));

// these should be auto-generated or discovered or something...
Object.keys(pages).forEach(
  path => router.get(path, serveHtml(`build/pages${path}.html`))
);

router.all('*', serve404('/404'));

app.use(router);
app.use(serve500('/500'));
app.listen(PORT, () => console.log(`Listening on ${PROTOCOL}://${HOST}:${PORT}/`));