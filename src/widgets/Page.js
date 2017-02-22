import React, {PropTypes} from 'react';
import buildWidget from '../utils/buildWidget';

const Page = ({pageData}) => (
  <div className="page">
    {(pageData.childWidgets || []).map(buildWidget)}
  </div>
);

Page.displayName = 'Page';

Page.propTypes = {
  pageData: PropTypes.shape({
    childWidgets: PropTypes.array,
  }).isRequired,
};

export default Page;
