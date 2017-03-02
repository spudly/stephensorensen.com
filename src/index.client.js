import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './widgets/App';

const el = React.createElement;

render(el(BrowserRouter, null, el(App, null)), document.querySelector('.root'));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw', {scope: '/'});
}
