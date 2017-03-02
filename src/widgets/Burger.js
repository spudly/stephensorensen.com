import React, {PropTypes} from 'react';
import classnames from '../utils/classnames';

const Burger = ({isOpen}) => (
  <div className={classnames('burger', {'burger-open': isOpen})}>
    <span />
    <span />
    <span />
    <span />
  </div>
);

Burger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

Burger.displayName = 'Burger';

export default Burger;
