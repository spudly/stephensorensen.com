import React, {PropTypes} from 'react';
import flatten from 'lodash/fp/flatten';

const LinkList = ({items}) => (
  <dl>
    {flatten(
      items.map(item => [
        <dt key={`${item.url}--dt`}><a href={item.url}>{item.name}</a></dt>,
        <dd key={`${item.url}--dd`}>{item.description}</dd>,
      ]),
    )}
  </dl>
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
