/* global localStorage */

import React from 'react';
import ReactDOM from 'react-dom';
import Themer from '../components/Themer';
import Bio from '../components/Bio';

export default () => (
  <div className="page">
    <h1>&lt;HelloWorld /&gt;</h1>
    <Themer />
    <Bio />
  </div>
);