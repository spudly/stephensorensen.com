import React, {PropTypes} from 'react';
import {Link, Route} from 'react-router-dom';
import classnames from 'classnames';
import Burger from './Burger';

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
    return (
      <nav className={classnames('nav', {'nav-open': isOpen})}>
        <button type="button" className="nav-toggle" onClick={this._handleButtonClick}>
          <Burger isOpen={isOpen} />
        </button>
        <ul className="nav-items">
          {items.map(item =>
            <Route key={item.url} path={item.url}>
              {({match}) =>
                <li
                  key={item.url}
                  className={classnames('nav-item', {'nav-item-active': match})}
                >
                  <Link to={item.url} onClick={this._handleLinkClick}>
                    {item.linkText}
                  </Link>
                </li>
              }
            </Route>
          )}
        </ul>
      </nav>
    );
  }

  // eslint-disable-next-line no-invalid-this
  _handleLinkClick = () => this.setState({isOpen: false});

  // eslint-disable-next-line no-invalid-this
  _handleButtonClick = () => this.setState({isOpen: !this.state.isOpen});
}

export default Nav;
