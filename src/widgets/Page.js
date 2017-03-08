const React = require('react');
const buildWidget = require('../utils/buildWidget');

const el = React.createElement;

const Page = ({pageData}) =>
  el('div', {className: 'page'}, (pageData.childWidgets || []).map(buildWidget));

Page.displayName = 'Page';

Page.propTypes = {
  pageData: React.PropTypes.shape({
    childWidgets: React.PropTypes.array,
  }).isRequired,
};

module.exports = Page;
