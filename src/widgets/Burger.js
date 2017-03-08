const React = require('react');
const classnames = require('../utils/classnames');

const el = React.createElement;

const Burger = ({isOpen}) =>
  el(
    'div',
    {className: classnames('burger', {'burger-open': isOpen})},
    el('span', null),
    el('span', null),
    el('span', null),
    el('span', null)
  );

Burger.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
};

Burger.displayName = 'Burger';

module.exports = Burger;
