import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Page from './Page';
import {pages} from '../../data.json';
import Nav from './Nav';

// eslint-disable-next-line react/display-name
const renderRedirect = to => () => <Redirect to={to} />;

// eslint-disable-next-line react/display-name
const renderPage = pageData => () => <Page pageData={pageData} />;

const App = () =>
  <div className="full-height">
    <Nav
      items={Object.keys(pages)
        .map(path => ({...pages[path], url: path}))
        .filter(page => page.nav)
        .map(page => ({linkText: page.title, url: page.url}))}
    />
    <Switch>
      <Route path="/" exact render={renderRedirect('/about')} />
      {Object.keys(pages).map(path =>
        <Route
          key={path}
          path={path}
          render={renderPage(pages[path])}
          pageData={pages[path]}
        />
      )}
      <Route path="*" component={Page} pageData={pages['404']} />
    </Switch>
  </div>;

App.displayName = 'App';

export default App;
