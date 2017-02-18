/* eslint-disable react/no-danger */
import React, {PropTypes} from 'react';

const MetaHtml = ({hash, contentHtml, title}) =>
  <html lang="en">
    <head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#444" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="stylesheet" href={`/${hash}/css`} />
      <link rel="manifest" href="/manifest.webmanifest" />
      <link rel="icon" type="image/png" href="/images/logo32.png" />
    </head>
    <body>
      <div className="root" dangerouslySetInnerHTML={{__html: contentHtml}} />
      <script src={`/${hash}/js`} />
    </body>
  </html>;

MetaHtml.displayName = 'MetaHtml';

MetaHtml.propTypes = {
  contentHtml: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MetaHtml;
