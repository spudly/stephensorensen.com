const React = require('react');
const {render} = require('react-dom');
const {BrowserRouter} = require('react-router-dom');
const App = require('./widgets/App');

const el = React.createElement;

render(el(BrowserRouter, null, el(App, null)), document.querySelector('.root'));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw', {scope: '/'});
}
