import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Page from './Page';
import pages from '../data/pages.json';
import Nav from './Nav';
import OnlineOfflineIndicator from './OnlineOfflineIndicator';

// eslint-disable-next-line react/display-name
const renderRedirect = to => () => <Redirect to={to} />;

// eslint-disable-next-line react/display-name
const renderPage = pageData => () => <Page pageData={pageData} />;

const App = () => (
  <div className="full-height">
    <OnlineOfflineIndicator />
    <Nav
      items={pages
        .filter(page => page.showInNavMenu)
        .map(page => ({linkText: page.title, url: page.pathname}))}
    />
    <Switch>
      <Route path="/" exact render={renderRedirect('/about')} />
      {pages.map(page => (
        <Route key={page.pathname} path={page.pathname} render={renderPage(page)} pageData={page} />
      ))}
      <Route path="*" render={renderPage(pages.find(page => page.pathname === '/404'))} />
    </Switch>
  </div>
);

App.displayName = 'App';

export default App;
