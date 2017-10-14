import React from 'react';
import twitter from '../utils/twitter';

class Tweet extends React.Component {
  componentDidMount() {
    this._createTweet();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this._createTweet();
    }
  }

  render() {
    return (
      <div
        ref={el => {
          this.el = el;
        }}
      />
    );
  }

  _createTweet() {
    this.el.innerHTML = '';
    twitter.ready(() => twitter.widgets.createTweet(this.props.id, this.el, {align: 'center'}));
  }
}

export default Tweet;
