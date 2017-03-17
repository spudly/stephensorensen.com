/* eslint-disable react/no-danger */
const React = require('react');

const el = React.createElement;

const MetaHtml = ({version, contentHtml, title}) =>
  el(
    'html',
    {lang: 'en'},
    el(
      'head',
      null,
      el('title', null, title),
      el('meta', {charSet: 'utf-8'}),
      el('meta', {name: 'viewport', content: 'width=device-width, initial-scale=1'}),
      el('meta', {name: 'theme-color', content: '#444'}),
      el('link', {rel: 'shortcut icon', href: '/favicon.ico'}),
      el('link', {rel: 'stylesheet', href: `/${version}/css`}),
      el('link', {rel: 'manifest', href: '/manifest.webmanifest'}),
      el('link', {rel: 'icon', type: 'image/png', href: '/images/logo32.png'})
    ),
    el(
      'body',
      null,
      el('div', {className: 'root', dangerouslySetInnerHTML: {__html: contentHtml}}),
      el('script', {src: `/${version}/js`})
    )
  );

MetaHtml.displayName = 'MetaHtml';

MetaHtml.propTypes = {
  version: React.PropTypes.string.isRequired,
  contentHtml: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
};

module.exports = MetaHtml;
