/* global localStorage */

import React from 'react';
import ReactDOM from 'react-dom';
import Bio from './Bio';
import Nav from './Nav';
import './index.css';

ReactDOM.render(
  <div>
    <Nav />
    <Bio />
  </div>,
  document.querySelector('.root')
);
