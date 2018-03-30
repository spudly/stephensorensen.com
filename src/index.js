// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import OperatingSystem from './OperatingSystem';

if (typeof document === 'undefined') {
  throw new Error('No Document!?');
}

const container = document.querySelector('#container');
if (!container) {
  throw new Error('No Container!?');
}

ReactDOM.render(<OperatingSystem />, container);
