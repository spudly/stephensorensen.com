const React = require('react');

const el = React.createElement;

const PageHeader = ({text}) => el('h1', {className: 'page-header'}, text);

PageHeader.displayName = 'PageHeader';

PageHeader.propTypes = {
  text: React.PropTypes.string.isRequired,
};

module.exports = PageHeader;
