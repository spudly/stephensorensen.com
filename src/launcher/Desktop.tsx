import * as React from 'react';
import Icon from './Icon';
import IconGrid from './IconGrid';
import LauncherIcon from './SvgLauncherIcon';

interface Props {
  addLauncherWindow: () => void;
}

const Desktop = ({addLauncherWindow}: Props) => (
  <div className="desktop">
    <IconGrid>
      <Icon key="Launcher" name="Launcher" icon={<LauncherIcon />} execute={addLauncherWindow} />
    </IconGrid>
  </div>
);

export default Desktop;
