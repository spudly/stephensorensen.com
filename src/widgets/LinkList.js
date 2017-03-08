const React = require('react');
const flatten = require('../utils/flatten');

const el = React.createElement;

const LinkList = ({items}) =>
  el(
    'dl',
    null,
    flatten(
      items.map(item => [
        el('dt', {key: `${item.url}--dt`}, el('a', {href: item.url}, item.name)),
        el('dd', {key: `${item.url}--dd`}, item.description),
      ])
    )
  );

LinkList.displayName = 'LinkList';

LinkList.propTypes = {
  items: React.PropTypes.shape({
    description: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
  }).isRequired,
};

module.exports = LinkList;
