import Gravatar from 'react-gravatar';
import React from 'react';

const Bio = () =>
  <div className="h-card">
    <Gravatar email="shuoink@gmail.com" size={250} className="u-photo" />

    <p>
      Hey, I&apos;m <span className="p-name">Stephen Sorensen</span>. I&apos;m a JavaScript developer living in the
      Atlanta, GA area. I work for {' '}
      <a href="https://www.theice.com">Intercontinental
      Exchange, Inc.</a>, where I develop frontend, backend, and universal
      javascript components for multiple websites, including the website for the{' '}
      <a href="https://www.nyse.com">New York Stock Exchange</a>. I am a member
      of <a href="https://www.mormon.org">The Church of Jesus Christ of
      Latter-day Saints</a> (Mormon). Among other things, I&apos;m also a husband,
      father, pyromaniac, cook, carpenter, gardener, camper, fisherman, and
      political junkie.
    </p>

    <p>As you can see, this page is (always) under construction.</p>

    <p>No, I&apos;m not looking for a job, but thanks for asking.</p>

    <h2>You can find me on...</h2>

    <ul>
      <li><a rel="me" href="https://www.facebook.com/stephenjohnsorensen">Facebook</a></li>
      <li><a rel="me" href="https://twitter.com/shuoink">Twitter</a></li>
      <li><a rel="me" href="https://plus.google.com/+StephenSorensen">Google+</a></li>
      <li><a rel="me" href="https://medium.com/@shuoink">Medium</a></li>
      <li><a rel="me" href="https://github.com/spudly">Github</a></li>
      <li><a rel="me" href="http://stackoverflow.com/users/163699/spudly">StackOverflow</a></li>
      <li><a rel="me" href="https://www.linkedin.com/in/stephensorensen">LinkedIn</a></li>
      <li><a rel="me" className="u-email" href="mailto:shuoink@gmail.com">Email: shuoink@gmail.com</a></li>
    </ul>
  </div>;

Bio.displayName = 'Bio';

export default Bio;
