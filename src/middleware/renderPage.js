const React = require('react');
const {renderToString, renderToStaticMarkup} = require('react-dom/server');
const {StaticRouter} = require('react-router-dom');
const App = require('../widgets/App');
const MetaHtml = require('../widgets/MetaHtml');
const {version} = require('../../package.json');

const renderPage = location => (response, context) => {
  const contentHtml = renderToString(
    React.createElement(StaticRouter, {location}, React.createElement(App, null))
  );

  const metaElement = React.createElement(MetaHtml, {
    version,
    path: location,
    contentHtml,
    title: 'page title' // TODO!
  });
  return Object.assign({}, response, {
    status: 200,
    type: 'text/html',
    body: `<!doctype html>${renderToStaticMarkup(metaElement)}`
  });
};

module.exports = renderPage;
