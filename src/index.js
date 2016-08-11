/* global localStorage */

import './index.css';
import Bio from './Bio';
import React from 'react';
import ReactDOM from 'react-dom';
import Themer from './Themer';

ReactDOM.render(
  <div>
    <Themer />
    <Bio />
  </div>,
  document.getElementById('root')
);
