const React = require('react');

const el = React.createElement;

const linkTypes = {
  facebook: {
    title: () => 'Facebook',
    url: value => `https://www.facebook.com/${value}`
  },
  twitter: {
    title: () => 'twitter',
    url: value => `https://twitter.com/${value.replace(/^@/, '')}`
  },
  googleplus: {
    title: () => 'Google+',
    url: value => `https://plus.google.com/${value}`
  },
  medium: {
    title: () => 'Medium',
    url: value => `https://medium.com/${value}`
  },
  github: {
    title: () => 'GitHub',
    url: value => `https://github.com/${value}`
  },
  stackoverflow: {
    title: () => 'StackOverflow',
    url: value => `http://stackoverflow.com/users/${value}`
  },
  linkedin: {
    title: () => 'LinkedIn',
    url: value => `https://www.linkedin.com/in/${value}`
  },
  email: {
    title: value => `Email (${value})`,
    url: value => `mailto:${value}`
  }
};

const SocialLinks = ({links}) => el(
  'ul',
  null,
  links.map(link => {
    const {title, url} = linkTypes[link.type] || {};
    if (!title) {
      return null;
    }
    return el('li', {}, el('a', {rel: 'me', href: url(link.value)}, title(link.value)));
  })
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
  twitter: React.PropTypes.string.isRequired
};

module.exports = SocialLinks;
