const React = require('react');

const el = React.createElement;

class OnlineOfflineIndicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offline: false,
    };
    this._handleOffline = () => this.setState({offline: true});
    this._handleOnline = () => this.setState({offline: false});
  }

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
}

OnlineOfflineIndicator.displayName = 'OnlineOfflineIndicator';

module.exports = OnlineOfflineIndicator;
