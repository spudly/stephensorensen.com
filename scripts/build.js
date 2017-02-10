/* eslint-disable no-console */
process.env.NODE_ENV = 'production';

import {StaticRouter} from 'react-router-dom';
import App from '../src/widgets/App';
import React from 'react';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import webpack from 'webpack';
import config from './webpack.config.prod';
import pify from 'pify';
import {sync as gzipSize} from 'gzip-size'; // TODO: use async version
import {pages} from '../data.json';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import printFileSizes from './utils/printFileSizes';
import removeFileNameHash from './utils/removeFileNameHash';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import cssnano from 'cssnano';
import _recursiveReadDir from 'recursive-readdir';

const recursiveReadDir = pify(_recursiveReadDir);

const BUILD = path.join(__dirname, '../build');
const SRC = path.join(__dirname, '../src');
const STATIC = path.join(__dirname, '../static');

const emptyDir = pify(fs.emptyDir);
const copy = pify(fs.copy);
const outputFile = pify(fs.outputFile);
const readFile = pify(fs.readFile);

const printErrors = (summary, errors) => {
  console.log(chalk.red(summary), '\n');
  errors.forEach(err => console.log(err.message || err, '\n'));
};

const copyStaticFolder = () => copy(STATIC, BUILD, {dereference: true});

const getPreviousSizeMap = () => recursiveReadDir(BUILD).then(fileNames =>
    (fileNames || [])
      .filter(fileName => /\.js$/.test(fileName))
      .reduce((memo, fileName) => {
        const contents = fs.readFileSync(fileName);
        const key = removeFileNameHash(fileName);
        memo[key] = gzipSize(contents);
        return memo;
      }, {})
  );

const webpackRun = config => new Promise((resolve, reject) => {
  webpack(config).run((error, stats) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(stats);
  });
});

const buildJavaScript = async () => {
  const previousSizeMap = await getPreviousSizeMap();
  await emptyDir(BUILD);

  console.log('Creating an optimized production build...');
  let stats;

  try {
    stats = await webpackRun(config);
    console.log(stats);
  } catch (error) {
    console.error('webpack failed\n', error.message, error.stack);
    process.exitCode = 1;
    return;
  }

  if (stats.compilation.errors.length) {
    printErrors('Failed to compile.', stats.compilation.errors);
    process.exitCode = 1;
    return;
  }

  if (process.env.CI && stats.compilation.warnings.length) {
    printErrors('Failed to compile.', stats.compilation.warnings);
    process.exitCode = 1;
    return;
  }

  console.log(chalk.green('Compiled successfully.\n'));

  console.log('File sizes after gzip:\n');
  await printFileSizes(stats, previousSizeMap);
  console.log();

  await copyStaticFolder();

  return stats.hash;
};

const MetaHtml = ({hash, path, contentHtml, title}) =>
  <html>
    <head>
      <title>{title}</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#444" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="stylesheet" href={`/${hash}/css`} />
      <link rel="manifest" href="/manifest.webmanifest" />
      <link rel="icon" type="image/png" href="/images/logo32.png" />
    </head>
    <body>
      <div className="root" dangerouslySetInnerHTML={{__html: contentHtml}} />
      <script src={`/${hash}/js`} />
    </body>
  </html>
;

const buildPages = (hash) => Promise.all(
  Object.keys(pages).map(path => {
    try {
      if (!path) {
        throw Error('no path!');
      }

      const pageData = pages[path];


      const contentHtml = renderToString(
        <StaticRouter location={path}>
          <App />
        </StaticRouter>
      );
      const metaElement =
        (<MetaHtml
          path={path}
          contentHtml={contentHtml}
          title={pageData.title}
          hash={hash}
        />)
      ;
      const metaHtml = `<!doctype html>${renderToStaticMarkup(metaElement)}`;
      return outputFile(`${BUILD}/pages${path}.html`, metaHtml);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  })
);

const writeBuildData = ({hash}) => outputFile(
  `${BUILD}/buildData.json`,
  JSON.stringify({hash})
);

const buildCss = async () => {
  const plugins = [postcssImport, autoprefixer, cssnano];
  const css = await readFile(`${SRC}/index.css`);
  const result = await postcss(plugins).process(css, {from: `${SRC}/index.css`, to: `${BUILD}/index.css`});
  await outputFile(`${BUILD}/index.css`, result.css);
};

buildCss()
  .then(buildJavaScript)
  .then(hash => Promise.all([
    writeBuildData({hash}),
    buildCss(hash),
    buildPages(hash),
    // TODO: build sitemap.txt
  ]))
  .catch(error => {
    throw error;
  });
