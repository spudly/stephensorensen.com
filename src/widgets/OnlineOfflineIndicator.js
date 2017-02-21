import React from 'react';

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
      return <div className="offline-indicator">Offline</div>;
    }

    return null;
  }

  // eslint-disable-next-line no-invalid-this
  _handleOffline = () => this.setState({offline: true});

  // eslint-disable-next-line no-invalid-this
  _handleOnline = () => this.setState({offline: false});
}

export default OnlineOfflineIndicator;
