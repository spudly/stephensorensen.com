import React, {PropTypes} from 'react';
import {Link, Route} from 'react-router-dom';
import classnames from '../utils/classnames';
import Burger from './Burger';

const el = React.createElement;

class Nav extends React.Component {
  static displayName = 'Nav';

  static propTypes = {
    items: PropTypes.shape({
      linkText: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    isOpen: true,
  };

  componentDidMount() {
    this.setState({isOpen: false});
  }

  render() {
    const {items} = this.props;
    const {isOpen} = this.state;
    return el(
      'nav',
      {className: classnames('nav', {'nav-open': isOpen})},
      el(
        'button',
        {type: 'button', className: 'nav-toggle', onClick: this._handleButtonClick},
        el(Burger, {isOpen}),
      ),
      el(
        'ul',
        {className: 'nav-items'},
        items.map(item =>
          el(Route, {key: item.url, path: item.url}, ({match}) =>
            el(
              'li',
              {key: item.url, className: classnames('nav-item', {'nav-item-active': match})},
              el(Link, {to: item.url, onClick: this._handleLinkClick}, item.linkText),
            ))),
      ),
    );
  }

  // eslint-disable-next-line no-invalid-this
  _handleLinkClick = () => this.setState({isOpen: false});

  // eslint-disable-next-line no-invalid-this
  _handleButtonClick = () => this.setState({isOpen: !this.state.isOpen});
}

export default Nav;
