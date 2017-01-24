/* global localStorage */

import React from 'react';
import ReactDOM from 'react-dom';
import Themer from './Themer';
import Social from './Social';
import Bio from './Bio';
import './index.css';

ReactDOM.render(
  <div className="page">
    <h1>&lt;HelloWorld name=&quot;Stephen Sorensen&quot; /&gt;</h1>
    <Themer />
    <Bio />
    <Social />
  </div>,
  document.querySelector('.root')
);
