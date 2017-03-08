const React = require('react');
const {Link, Route} = require('react-router-dom');
const classnames = require('../utils/classnames');
const Burger = require('./Burger');

const el = React.createElement;

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
    this._handleLinkClick = () => this.setState({isOpen: false});
    this._handleButtonClick = () => this.setState({isOpen: !this.state.isOpen});
  }

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
        el(Burger, {isOpen})
      ),
      el(
        'ul',
        {className: 'nav-items'},
        items.map(item =>
          el(Route, {key: item.url, path: item.url}, ({match}) =>
            el(
              'li',
              {key: item.url, className: classnames('nav-item', {'nav-item-active': match})},
              el(Link, {to: item.url, onClick: this._handleLinkClick}, item.linkText)
            )))
      )
    );
  }
}

Nav.displayName = 'Nav';

Nav.propTypes = {
  items: React.PropTypes.shape({
    linkText: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
  }).isRequired,
};

module.exports = Nav;
