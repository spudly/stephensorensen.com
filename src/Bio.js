import Gravatar from 'react-gravatar';
import OssProject from './OssProject';
import React from 'react';

const Bio = () =>
  <div>
    <h1>Hello World!</h1>

    <Gravatar email="shuoink@gmail.com" size={250} />

    <p>
      I am Stephen Sorensen. I'm a frontend web developer living in the Atlanta,
      GA area. I work for <a href="https://www.theice.com">Intercontinental
      Exchange, Inc.</a>, where I develop frontend javascript components for
      multiple websites, including the website for the{' '}
      <a href="https://www.nyse.com">New York Stock Exchange</a>. I am a member
      of <a href="https://www.lds.org">The Church of Jesus Christ of Latter-day
      Saints</a> (Mormon). Among other things, I'm also a husband,
      father, pyromaniac, cook, carpenter, gardener, camper, fisherman, and
      political junkie.
    </p>

    <p>As you can see, this page is under construction.</p>

    <p>No, I'm not looking for a job, but thanks for asking.</p>

    <h1>My Open Source Projects</h1>
    <OssProject name="error-subclass" />
    <OssProject name="talk-like-a-pirate" />
    <OssProject name="react-card" />
    <OssProject name="react-deck" />
    <OssProject name="error-wrapper" />
    <OssProject name="eslint-config" scope="@spudly/" />
    <OssProject name="index-card.css" />
    <OssProject name="card.css" />
  </div>;

Bio.displayName = 'Bio';

export default Bio;
