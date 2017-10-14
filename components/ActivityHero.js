import React from 'react';
import Hero from './Hero';
import Tweet from './Tweet';
import FetchActivity from './FetchActivity';
import Carousel from './Carousel';
import {isTweet, isRetweet, isReplyToTweet} from '../utils/twitter';

const getHeader = event => {
  const prefix = 'Lately... ';
  if (isTweet(event)) {
    if (isRetweet(event)) {
      return `${prefix}I Retweeted.`;
    }
    if (isReplyToTweet(event)) {
      return `${prefix}I Replied to a Tweet.`;
    }
    return `${prefix}I Tweeted.`;
  }
  return '[unknown event]';
};

const ActivityHero = () => (
  <Hero>
    <FetchActivity>
      {({events}) => (
        <Carousel items={events} loop>
          {({item: event}) => (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <h1>{getHeader(event)}</h1>
              <div
                style={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isTweet(event) && <Tweet id={event.id_str} />}
              </div>
            </div>
          )}
        </Carousel>
      )}
    </FetchActivity>
  </Hero>
);

export default ActivityHero;
