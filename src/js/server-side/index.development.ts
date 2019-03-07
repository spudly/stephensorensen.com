process.env.NODE_ENV = 'development';

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import postcssMiddleware from 'postcss-middleware';
import router from './router';
// @ts-ignore
import webpackConfig from '../../../webpack.config.js';
// @ts-ignore
import postcssConfig from '../../../postcss.config.js';

const serveJs = webpackDevMiddleware(webpack({...webpackConfig, mode: 'development'}), {
  publicPath: webpackConfig.output.publicPath,
});

const app = express();
app.get('/js', (req, resp, next) => {
  req.url = '/index.js';
  serveJs(req, resp, next);
});
app.get(
  '/css',
  postcssMiddleware({
    ...postcssConfig,
    src: req => 'src/css/index.css',
  })
);
app.use(router);
app.listen(8080, () => {
  console.log(`Listening @ http://localhost:8080/`);
});
