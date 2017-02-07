import React from 'react';
import {Link, Route} from 'react-router-dom';
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
          {items.map(item =>
            <Route
              key={item.url}
              path={item.url}
              children={({match}) =>
                <li key={item.url} className={classnames('nav-item', {'nav-item-active': match})}>
                  <Link to={item.url} onClick={this._toggleOpen}>
                    {item.linkText}
                  </Link>
                </li>
              }
            />
          )}
        </ul>
      </nav>
    );
  }

  _toggleOpen = () => this.setState(toggleOpen);
}

export default Nav;
