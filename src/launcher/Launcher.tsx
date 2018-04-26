// @flow
import * as React from 'react';
import Window from '../os/Window';
import IconGrid from './IconGrid';
import Icon from './Icon';
import OsContext, {OsContextValues} from '../os/OsContext';
import LauncherIcon from './SvgLauncherIcon';
import Desktop from './Desktop';

interface Props {
  id: string;
}

const Launcher = ({id}: Props) => (
  <React.Fragment>
    <Desktop />
    <OsContext.Consumer>
      {({apps, killProcess}: OsContextValues) => (
        <Window title="Program Manager" close={() => killProcess(id)} icon={LauncherIcon}>
          <IconGrid>
            {apps
              .filter(app => !!app.icon)
              .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
              .map(app => (
                <Icon key={app.name} name={app.name} icon={app.icon ? <app.icon /> : null} />
              ))}
          </IconGrid>
        </Window>
      )}
    </OsContext.Consumer>
  </React.Fragment>
);

export default Launcher;
