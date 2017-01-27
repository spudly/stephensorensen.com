/* global localStorage */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRedirect, Route, browserHistory} from 'react-router';
import Bio from './Bio';
import Nav from './Nav';
import Experiments from './Experiments';
import Projects from './Projects';
import './css/index.css';

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
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/about" />
      <Route path="/about" component={Bio} />
      <Route path="/projects" component={Projects} />
      <Route path="/experiments" component={Experiments} />
      <Route path="*" component={Status404} />
    </Route>
  </Router>,
  document.querySelector('.root')
);
