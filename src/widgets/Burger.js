import React, {PropTypes} from 'react';
import classnames from '../utils/classnames';

const el = React.createElement;

const Burger = ({isOpen}) =>
  el(
    'div',
    {className: classnames('burger', {'burger-open': isOpen})},
    el('span', null),
    el('span', null),
    el('span', null),
    el('span', null),
  );

Burger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

Burger.displayName = 'Burger';

export default Burger;
