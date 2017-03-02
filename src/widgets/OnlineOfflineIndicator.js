import React from 'react';

const el = React.createElement;

class OnlineOfflineIndicator extends React.Component {
  static displayName = 'OnlineOfflineIndicator';

  state = {
    offline: false,
  };

  componentDidMount() {
    if (navigator.onLine === false) {
      this.setState({offline: true});
    }
    window.addEventListener('offline', this._handleOffline);
    window.addEventListener('online', this._handleOnline);
  }

  render() {
    if (this.state.offline) {
      return el('div', {className: 'offline-indicator'}, 'Offline');
    }

    return null;
  }

  // eslint-disable-next-line no-invalid-this
  _handleOffline = () => this.setState({offline: true});

  // eslint-disable-next-line no-invalid-this
  _handleOnline = () => this.setState({offline: false});
}

export default OnlineOfflineIndicator;
