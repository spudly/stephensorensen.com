import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Page from './Page';
import pages from '../data/pages.json';
import Nav from './Nav';
import OnlineOfflineIndicator from './OnlineOfflineIndicator';

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
    }),
  ),
);

App.displayName = 'App';

export default App;
