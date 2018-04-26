import * as React from 'react';
import Icon from './Icon';
import IconGrid from './IconGrid';
import LauncherIcon from './SvgLauncherIcon';

const Desktop = () => (
  <div className="desktop">
    <IconGrid>
      <Icon key="Launcher" name="Launcher" icon={<LauncherIcon />} />
    </IconGrid>
  </div>
);

export default Desktop;
