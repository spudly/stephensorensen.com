import React, {PropTypes} from 'react';

const PageHeader = ({text}) => <h1 className="page-header">{text}</h1>;

PageHeader.displayName = 'PageHeader';

PageHeader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PageHeader;
