/* global localStorage */

import './themes/90s/index.css';
import './themes/default/index.css';
import React from 'react';

class Themer extends React.Component {
  static displayName = 'Themer';

  constructor(props) {
    super(props);
    this.state = {
      theme: localStorage.getItem('theme') || 'default',
    };
  }

  componentDidMount() {
    this._injectTheme();
  }

  componentDidUpdate() {
    this._injectTheme();
  }

  _injectTheme() {
    document.body.setAttribute('data-theme', this.state.theme);
  }

  _handleChange = event => {
    localStorage.setItem('theme', event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="themer">
        Theme:
        {' '}
        <select
          name="theme"
          onBlur={this._handleChange}
          onChange={this._handleChange}
          value={this.state.theme}
        >
          <option value="default">Default</option>
          <option value="90s">90s</option>
        </select>
      </div>
    );
  }
}

export default Themer;
