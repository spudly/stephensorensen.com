import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Page from './Page';
import {pages} from '../../data.json';
import Nav from './Nav';

const App = ({children}) =>
  <div className="full-height">
    <Nav
      items={
        Object.keys(pages)
          .map(path => ({...pages[path], url: path}))
          .filter(page => page.nav)
          .map(page => ({url: page.url, linkText: page.title}))
      }
    />
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/about" />} />
      {Object.keys(pages).map(path =>
        <Route
          key={path}
          path={path}
          component={Page}
          pageData={pages[path]}
        />
      )}
      <Route path="*" component={Page} pageData={pages['404']} />
    </Switch>
  </div>
;

export default App;
