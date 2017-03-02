/* eslint-disable react/no-danger */
import React, {PropTypes} from 'react';

const el = React.createElement;

const MetaHtml = ({buildId, contentHtml, title}) =>
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
      el('link', {rel: 'stylesheet', href: `/${buildId}/css`}),
      el('link', {rel: 'manifest', href: '/manifest.webmanifest'}),
      el('link', {rel: 'icon', type: 'image/png', href: '/images/logo32.png'}),
    ),
    el(
      'body',
      null,
      el('div', {className: 'root', dangerouslySetInnerHTML: {__html: contentHtml}}),
      el('script', {src: `/${buildId}/js`}),
    ),
  );

MetaHtml.displayName = 'MetaHtml';

MetaHtml.propTypes = {
  buildId: PropTypes.string.isRequired,
  contentHtml: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MetaHtml;
