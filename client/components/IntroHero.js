import React from 'react';
import Hero from './Hero';

const IntroHero = () => (
  <Hero
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div className="perspective">
      <div className="polaroid">
        <img
          src="https://www.gravatar.com/avatar/8db4c1b03b20a1b5614f8e4a2cfbc188?d=retro&amp;r=g&amp;s=400"
          alt="Stephen Sorensen"
        />
      </div>
    </div>
    <h1>
      <a href="https://stephensorensen.com/">Stephen Sorensen</a>
    </h1>
    <ul className="titles">
      <li>JavaScript Developer</li>
      <li>Political Junkie</li>
      <li>Mormon</li>
      <li>Pyromaniac</li>
    </ul>
    <ul className="profiles">
      <li>
        <a href="mailto:shuoink@gmail.com">
          <img src="/icons/email.svg" alt="Email: shuoink@gmail.com" />{' '}
        </a>
      </li>
      <li>
        <a href="https://medium.com/@shuoink">
          <img src="/icons/medium.svg" alt="Medium Profile" />{' '}
        </a>
      </li>
      <li>
        <a href="https://github.com/spudly">
          <img src="/icons/github.svg" alt="Github Profile" />{' '}
        </a>
      </li>
      <li>
        <a href="http://stackoverflow.com/users/163699/spudly">
          <img src="/icons/stack-overflow.svg" alt="Stack Overflow Profile" />{' '}
        </a>
      </li>
      <li>
        <a href="https://twitter.com/shuoink">
          <img src="/icons/twitter.svg" alt="Twitter Profile" />{' '}
        </a>
      </li>
      <li>
        <a href="https://www.facebook.com/stephenjohnsorensen">
          <img src="/icons/facebook.svg" alt="Facebook Profile" />{' '}
        </a>
      </li>
    </ul>
  </Hero>
);

export default IntroHero;
