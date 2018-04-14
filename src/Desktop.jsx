import * as React from 'react';
import Icon from './widgets/Icon';
import IconGrid from './widgets/IconGrid';
import ProgManIcon from './svg/SvgProgManIcon';

const Desktop = () => (
  <div className="desktop">
    <IconGrid>
      <Icon key="ProgMan" name="ProgMan" icon={<ProgManIcon />} />
    </IconGrid>
  </div>
);

export default Desktop;
