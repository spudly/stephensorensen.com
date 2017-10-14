import React from 'react';
import Hero from './Hero';
import EmailIcon from './EmailIcon';
import MediumIcon from './MediumIcon';
import GithubIcon from './GithubIcon';
import StackOverflowIcon from './StackOverflowIcon';
import TwitterIcon from './TwitterIcon';
import FacebookIcon from './FacebookIcon';

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
          <EmailIcon />
        </a>
      </li>
      <li>
        <a href="https://medium.com/@shuoink">
          <MediumIcon />
        </a>
      </li>
      <li>
        <a href="https://github.com/spudly">
          <GithubIcon />
        </a>
      </li>
      <li>
        <a href="http://stackoverflow.com/users/163699/spudly">
          <StackOverflowIcon />
        </a>
      </li>
      <li>
        <a href="https://twitter.com/shuoink">
          <TwitterIcon />
        </a>
      </li>
      <li>
        <a href="https://www.facebook.com/stephenjohnsorensen">
          <FacebookIcon />
        </a>
      </li>
    </ul>
  </Hero>
);

export default IntroHero;
