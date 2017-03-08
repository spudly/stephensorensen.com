const React = require('react');
const {Redirect, Route, Switch} = require('react-router-dom');
const Page = require('./Page');
const pages = require('../data/pages.json');
const Nav = require('./Nav');
const OnlineOfflineIndicator = require('./OnlineOfflineIndicator');

const el = React.createElement;

// eslint-disable-next-line react/display-name
const renderRedirect = to => () => el(Redirect, {to});

// eslint-disable-next-line react/display-name
const renderPage = pageData => () => el(Page, {pageData});

const App = () => el(
  'div',
  {className: 'full-height'},
  el(OnlineOfflineIndicator, null),
  el(Nav, {
    items: pages
      .filter(page => page.showInNavMenu)
      .map(page => ({linkText: page.title, url: page.pathname})),
  }),
  el(
    Switch,
    null,
    el(Route, {path: '/', exact: true, render: renderRedirect('/about')}),
    pages.map(page => el(Route, {
      key: page.pathname,
      path: page.pathname,
      render: renderPage(page),
      pageData: page,
    })),
    el(Route, {
      path: '*',
      render: renderPage(pages.find(page => page.pathname === '/404')),
    })
  )
);

App.displayName = 'App';

module.exports = App;
