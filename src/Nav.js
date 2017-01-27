import React from 'react';
import {Link} from 'react-router';

const Nav = ({items}) => (
  <ul className="nav">
    {items.map(item => (
      <li key={item.url} className="nav-item">
        <Link to={item.url} activeClassName="nav-item-active">
          {item.linkText}
        </Link>
      </li>
    ))}
  </ul>
);

export default Nav;