const fetch = require('node-fetch');
const throttle = require('./throttle');

const base64 = string => new Buffer(string).toString('base64');

const enc = encodeURIComponent;

let TWITTER_TOKEN;
const getTwitterToken = async ({key, secret}) => {
  if (TWITTER_TOKEN) {
    return TWITTER_TOKEN;
  }

  const response = await fetch('https://api.twitter.com/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: `Basic ${base64(`${enc(key)}:${enc(secret)}`)}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (response.status !== 200) {
    throw new Error(`Bad Response: ${response.status} ${response.statusText}`);
  }

  ({access_token: TWITTER_TOKEN} = await response.json());

  return TWITTER_TOKEN;
};

const filterTweets = tweets =>
  tweets.filter(tweet => {
    return tweet.user.screen_name === 'shuoink';
  });

const fetchTweets = async ({key, secret, username}) => {
  const token = await getTwitterToken({key, secret});

  const response = await fetch(
    `https://api.twitter.com/1.1/statuses/user_timeline.json?count=100&screen_name=${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== 200) {
    throw new Error(`Bad Response: ${response.status} ${response.statusText}`);
  }

  const tweets = await response.json();

  return filterTweets(tweets);
};

module.exports = throttle(fetchTweets, 60000);
