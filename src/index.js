/* global localStorage */

import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import Bio from './Bio';
import Nav from './Nav';
import Experiments from './Experiments';
import Projects from './Projects';
import {parse as parseUrl} from 'url';
import './css/index.css';

import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';
import flowRight from 'lodash/fp/flowRight';
import fromPairs from 'lodash/fp/fromPairs';
import map from 'lodash/fp/map';
import split from 'lodash/fp/split';

const fragment = flowRight(
  decodeURIComponent,
  getOr('', '_escaped_fragment_'),
  fromPairs,
  map(split('=')),
  split('&'),
  get('query'),
  parseUrl
)(location.href);

if (fragment) {
  history.pushState(null, null, `/#!${fragment}`);
}

// <Route path="/?_escaped_fragment_=*" render={() => <Redirect to="/projects" />} />


const Status404 = () => <div>404</div>;

const App = ({children}) => (
  <div className="full-height">
    <Nav
      items={[
        {url: '/about', linkText: '#whoami'},
        {url: '/projects', linkText: '#code'},
        {url: '/experiments', linkText: '#sandbox'},
      ]}
    />
    {children}
  </div>
);

ReactDOM.render(
  <HashRouter hashType="hashbang">
    <App>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/about" />} />
        <Route path="/about" component={Bio} />
        <Route path="/projects" component={Projects} />
        <Route path="/experiments" component={Experiments} />
        <Route path="*" component={Status404} />
      </Switch>
    </App>
  </HashRouter>,
  document.querySelector('.root')
);
