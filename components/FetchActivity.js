import React from 'react';

class FetchActivity extends React.Component {
  state = {events: []};

  componentWillMount() {
    fetch('/activity')
      .then(response => response.json())
      .then(events => {
        this.setState({events});
      });
  }

  render() {
    return this.props.children(this.state);
  }
}

export default FetchActivity;
