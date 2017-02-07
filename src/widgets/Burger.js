import React from 'react';
import classnames from 'classnames';

const Burger = ({isOpen}) =>
  <div className={classnames('burger', {'burger-open': isOpen})}>
    <span />
    <span />
    <span />
    <span />
  </div>
;

export default Burger;
