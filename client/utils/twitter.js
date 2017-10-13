const makeTwitter = () => {
  const [firstScript] = document.getElementsByTagName('script');
  const twitter = window.twttr || {};
  if (document.getElementById('twitter-wjs')) {
    return twitter;
  }
  const script = Object.assign(document.createElement('script'), {
    id: 'twitter-wjs',
    src: 'https://platform.twitter.com/widgets.js',
  });
  firstScript.parentNode.insertBefore(script, firstScript);

  twitter._e = [];
  twitter.ready = function(fn) {
    twitter._e.push(fn);
  };
  window.twttr = twitter;
  return twitter;
};

export const isRetweet = tweet => !!tweet.retweeted_status;

export const isReplyToTweet = tweet => !!tweet.in_reply_to_screen_name;

export const isTweet = () => true; // TODO: implement this

export default makeTwitter();
