import express from 'express';
import browserify from 'browserify';
import watchifyMiddleware from 'watchify-middleware';
import tinyLr from 'tiny-lr';
import fetchTweets from './utils/fetchTweets';

const PORT = 8080;
const LIVE_RELOAD_PORT = 35729;
const __DEV__ = process.env.NODE_ENV === 'development';

const promiseRoute = fn => async (req, resp, next) => {
  try {
    return await fn(req, resp, next);
  } catch (error) {
    return next(error);
  }
};

const createJavaScriptMiddleware = () => {
  if (!__DEV__) {
    return (req, resp) => resp.sendFile(`${__dirname}/index.client.build.js`);
  }

  const liveReloadServer = tinyLr();

  const bundler = browserify(`${__dirname}/index.client.js`, {
    cache: {},
    packageCache: {},
    basedir: __dirname,
  });

  const watchify = watchifyMiddleware.emitter(bundler, {
    // poll: true,
    errorHandler: true,
  });

  watchify.on('update', () => {
    console.log('update');
    liveReloadServer.changed({params: {files: ['/js']}});
  });

  liveReloadServer.listen(LIVE_RELOAD_PORT, () => {
    process.stdout.write('Live Reload Server Listening');
  });

  return watchify.middleware;
};

const serveContentSecurityPolicy = (req, resp, next) => {
  // const contentSecurityPolicy = setHeader('Content-Security-Policy');
  next();
};

const serveActivity = promiseRoute(async (req, resp) => {
  const tweets = await fetchTweets({
    key: process.env.TWITTER_CONSUMER_KEY,
    secret: process.env.TWITTER_CONSUMER_SECRET,
    username: 'shuoink',
  });

  resp.json(tweets);
});

const serveCss = (req, resp) => {
  resp.sendFile(`${__dirname}/index.css`);
};

const serveHtml = (req, resp) =>
  resp.type('html').send(`<!doctype html>
<html lang="en">
  <head>
    <title>Stephen Sorensen</title>
    <meta name="viewport" content="width=device-width" />
    <meta charset="utf-8" />
    <link rel="stylesheet" href="/css" />
  </head>
  <body>
    <div id="container"></div>
    <script src="/js"></script>
    ${__DEV__ ? `<script src="http://localhost:35729/livereload.js"></script>` : ''}
  </body>
</html>`);

const serveJs = createJavaScriptMiddleware();

const createAppServer = () =>
  express()
    .use(serveContentSecurityPolicy)
    .get('/js', serveJs)
    .get('/activity', serveActivity)
    .get('/css', serveCss)
    .get('/', serveHtml);

createAppServer().listen(PORT, () => {
  process.stdout.write(`Listening: http://localhost:${PORT}\n`);
});
