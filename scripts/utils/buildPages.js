/* eslint-disable no-console */
import {StaticRouter} from 'react-router-dom';
import App from '../../src/widgets/App';
import React from 'react';
import {pages} from '../../data.json';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import MetaHtml from './MetaHtml';
import {join} from 'path';
import pify from 'pify';
import fs from 'fs-extra';

const outputFile = pify(fs.outputFile);
const BUILD = join(__dirname, '../../build');

const buildPages = hash => Promise.all(
  Object.keys(pages).map(path => {
    try {
      if (!path) {
        throw Error('no path!');
      }

      const pageData = pages[path];

      const contentHtml = renderToString(
        <StaticRouter location={path}>
          <App />
        </StaticRouter>,
      );

      const metaElement =
        <MetaHtml
          path={path}
          contentHtml={contentHtml}
          title={pageData.title}
          hash={hash}
        />;
      const metaHtml = `<!doctype html>${renderToStaticMarkup(metaElement)}`;
      return outputFile(`${BUILD}/pages${path}.html`, metaHtml);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }),
);

export default buildPages;
