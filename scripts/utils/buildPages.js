/* eslint-disable no-console */
import {StaticRouter} from 'react-router-dom';
import App from '../../src/widgets/App';
import React from 'react';
import pages from '../../src/data/pages.json';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import MetaHtml from './MetaHtml';
import pify from 'pify';
import fs from 'fs-extra';
import {BUILD} from './paths';

const outputFile = pify(fs.outputFile);

const buildPages = buildId => Promise.all(
  pages.map(page => {
    try {
      const contentHtml = renderToString(
        <StaticRouter location={page.pathname}>
          <App />
        </StaticRouter>,
      );

      const metaElement =
        <MetaHtml
          path={page.pathname}
          contentHtml={contentHtml}
          title={page.title}
          buildId={buildId}
        />;
      const metaHtml = `<!doctype html>${renderToStaticMarkup(metaElement)}`;
      return outputFile(`${BUILD}/pages${page.pathname}.html`, metaHtml);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }),
);

export default buildPages;
