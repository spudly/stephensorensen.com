const React = require('react');

const el = React.createElement;

const SocialLinks = (
  {
    facebook,
    twitter,
    googleplus,
    medium,
    github,
    stackoverflow,
    linkedin,
    email,
  }
) => el(
  'ul',
  null,
  el('li', null, el('a', {rel: 'me', href: `https://www.facebook.com/${facebook}`}, 'Facebook')),
  twitter &&
    el(
      'li',
      null,
      el(
        'a',
        {
          rel: 'me',
          href: `https://twitter.com/${twitter.replace(/^@/, '')}`,
        },
        'Twitter'
      )
    ),
  el('li', null, el('a', {rel: 'me', href: `https://plus.google.com/${googleplus}`}, 'Google+')),
  el('li', null, el('a', {rel: 'me', href: `https://medium.com/${medium}`}, 'Medium')),
  el(
    'li',
    null,
    el(
      'a',
      {
        rel: 'me',
        href: `https://github.com/${github}`,
      },
      'GitHub'
    )
  ),
  el(
    'li',
    null,
    el(
      'a',
      {
        rel: 'me',
        href: `http://stackoverflow.com/users/${stackoverflow}`,
      },
      'StackOverflow'
    )
  ),
  el('li', null, el('a', {rel: 'me', href: `https://www.linkedin.com/in/${linkedin}`}, 'LinkedIn')),
  el(
    'li',
    null,
    el('a', {rel: 'me', className: 'u-email', href: `mailto:${email}`}, 'Email: shuoink@gmail.com')
  )
);

SocialLinks.displayName = 'SocialLinks';

SocialLinks.propTypes = {
  email: React.PropTypes.string.isRequired,
  facebook: React.PropTypes.string.isRequired,
  github: React.PropTypes.string.isRequired,
  googleplus: React.PropTypes.string.isRequired,
  linkedin: React.PropTypes.string.isRequired,
  medium: React.PropTypes.string.isRequired,
  stackoverflow: React.PropTypes.string.isRequired,
  twitter: React.PropTypes.string.isRequired,
};

module.exports = SocialLinks;
