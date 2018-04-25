import * as React from 'react';
import Icon from './Icon';
import IconGrid from './IconGrid';
import ProgManIcon from './SvgProgManIcon';

const Desktop = () => (
  <div className="desktop">
    <IconGrid>
      <Icon key="ProgMan" name="ProgMan" icon={<ProgManIcon />} />
    </IconGrid>
  </div>
);

export default Desktop;
