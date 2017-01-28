import React from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';
import Burger from './Burger';

const toggleOpen = ({isOpen}) => ({isOpen: !isOpen});

class Nav extends React.Component {

  state = {
    isOpen: false,
  };

  render() {
    const {items} = this.props;
    const {isOpen} = this.state;
    return (
      <nav className={classnames('nav', {'nav-open': isOpen})}>
        <button
          type="button"
          className="nav-toggle"
          onClick={this._toggleOpen}
        >
          <Burger isOpen={isOpen} />
        </button>
        <ul className="nav-items">
          {items.map(item => (
            <li key={item.url} className="nav-item">
              <Link
                to={item.url}
                activeClassName="nav-item-active"
                onClick={this._toggleOpen}
              >
                {item.linkText}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  _toggleOpen = () => this.setState(toggleOpen);
}

export default Nav;