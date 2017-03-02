import React, {PropTypes} from 'react';
import buildWidget from '../utils/buildWidget';

const el = React.createElement;

const Page = ({pageData}) =>
  el('div', {className: 'page'}, (pageData.childWidgets || []).map(buildWidget));

Page.displayName = 'Page';

Page.propTypes = {
  pageData: PropTypes.shape({
    childWidgets: PropTypes.array,
  }).isRequired,
};

export default Page;
