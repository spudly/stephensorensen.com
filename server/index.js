const express = require('express');
const fetchTweets = require('./twitter');
const path = require('path');

const PORT = 8080;

const app = express();

const promiseRoute = fn => async (req, resp, next) => {
  try {
    return await fn(req, resp, next);
  } catch (error) {
    return next(error);
  }
};

app
  .use((req, resp, next) => {
    // const contentSecurityPolicy = setHeader('Content-Security-Policy');
    next();
  })
  .get('/js', (req, resp) => {
    resp.sendFile(path.resolve(`${__dirname}/../client/index.build.js`));
  })
  .get(
    '/activity',
    promiseRoute(async (req, resp) => {
      const tweets = await fetchTweets({
        key: process.env.TWITTER_CONSUMER_KEY,
        secret: process.env.TWITTER_CONSUMER_SECRET,
        username: 'shuoink',
      });

      resp.json(tweets);
    }),
  )
  .use(express.static(`${__dirname}/../client`))
  .listen(8080, () => {
    process.stdout.write(`Listening: http://localhost:${PORT}\n`);
  });
