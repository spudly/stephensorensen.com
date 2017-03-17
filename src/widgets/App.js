const React = require('react');
const {Route, Switch} = require('react-router-dom');
const Page = require('./Page');
const pages = require('../data/pages.json');
const Nav = require('./Nav');
const OnlineOfflineIndicator = require('./OnlineOfflineIndicator');

const el = React.createElement;

// eslint-disable-next-line react/display-name
const renderPage = pageData => () => el(Page, {pageData});

const App = () => el(
  'div',
  {className: 'full-height'},
  el(OnlineOfflineIndicator, null),
  el(Nav, {
    items: pages
      .filter(page => page.showInNavMenu)
      .map(page => ({linkText: page.title, url: page.pathname}))
  }),
  el(Switch, null, [
    ...pages.map(page => el(Route, {
      key: page.pathname,
      path: page.pathname,
      exact: true,
      strict: true,
      render: renderPage(page),
      pageData: page
    })),
    el(Route, {
      key: '*',
      path: '*',
      render: renderPage(pages.find(page => page.pathname === '/404'))
    })
  ])
);

App.displayName = 'App';

module.exports = App;
