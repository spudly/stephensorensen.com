// @flow
import * as React from 'react';
import Window from '../widgets/Window';
import IconGrid from '../widgets/IconGrid';
import Icon from '../widgets/Icon';
import OsContext, {OsContextValues} from '../OsContext';
import ProgManIcon from '../svg/SvgProgManIcon';

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
