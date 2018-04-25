// @flow
import * as React from 'react';
import Window from '../os/Window';
import IconGrid from './IconGrid';
import Icon from './Icon';
import OsContext, {OsContextValues} from '../os/OsContext';
import ProgManIcon from './SvgProgManIcon';

interface Props {
  id: string;
}

const ProgMan = ({id}: Props) => (
  <OsContext.Consumer>
    {({apps, killProcess}: OsContextValues) => (
      <Window title="Program Manager" close={() => killProcess(id)} icon={ProgManIcon}>
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
);

export default ProgMan;
