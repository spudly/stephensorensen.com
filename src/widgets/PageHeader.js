import React, {PropTypes} from 'react';

const el = React.createElement;

const PageHeader = ({text}) => el('h1', {className: 'page-header'}, text);

PageHeader.displayName = 'PageHeader';

PageHeader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PageHeader;
