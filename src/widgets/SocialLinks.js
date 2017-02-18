import React, {PropTypes} from 'react';

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
  },
) =>
  <ul>
    <li>
      <a rel="me" href={`https://www.facebook.com/${facebook}`}>Facebook</a>
    </li>
    <li>
      <a rel="me" href={`https://twitter.com/${twitter.replace(/^@/, '')}`}>
        Twitter
      </a>
    </li>
    <li>
      <a rel="me" href={`https://plus.google.com/${googleplus}`}>Google+</a>
    </li>
    <li><a rel="me" href={`https://medium.com/${medium}`}>Medium</a></li>
    <li><a rel="me" href={`https://github.com/${github}`}>GitHub</a></li>
    <li>
      <a rel="me" href={`http://stackoverflow.com/users/${stackoverflow}`}>
        StackOverflow
      </a>
    </li>
    <li>
      <a rel="me" href={`https://www.linkedin.com/in/${linkedin}`}>LinkedIn</a>
    </li>
    <li>
      <a rel="me" className="u-email" href={`mailto:${email}`}>
        Email: shuoink@gmail.com
      </a>
    </li>
  </ul>;

SocialLinks.displayName = 'SocialLinks';

SocialLinks.propTypes = {
  email: PropTypes.string.isRequired,
  facebook: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  googleplus: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
  medium: PropTypes.string.isRequired,
  stackoverflow: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
};

export default SocialLinks;
