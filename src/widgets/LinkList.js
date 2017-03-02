import React, {PropTypes} from 'react';
import flatten from '../utils/flatten';

const el = React.createElement;

const LinkList = ({items}) =>
  el(
    'dl',
    null,
    flatten(
      items.map(item => [
        el('dt', {key: `${item.url}--dt`}, el('a', {href: item.url}, item.name)),
        el('dd', {key: `${item.url}--dd`}, item.description),
      ]),
    ),
  );

LinkList.displayName = 'LinkList';

LinkList.propTypes = {
  items: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default LinkList;
