// @flow
import * as React from 'react';
import Window from '../widgets/Window';
import IconGrid from '../widgets/IconGrid';
import Icon from '../widgets/Icon';
import OsContext, {OsContextValues} from '../OsContext';

interface Props {
  id: string;
}

interface State {
  selected: string[];
}

class ProgMan extends React.Component<Props, State> {
  state: State = {selected: []};

  render() {
    const {props: {id}, state: {selected}} = this;
    return (
      <OsContext.Consumer>
        {({apps, killProcess}: OsContextValues) => (
          <Window title="Program Manager" close={() => killProcess(id)}>
            <IconGrid select={keys => this.setState({selected: keys})}>
              {apps
                .filter(app => !!app.icon)
                .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
                .map(app => (
                  <Icon
                    key={app.name}
                    name={app.name}
                    icon={app.icon ? <app.icon /> : null}
                    select={() => this.setState({selected: [app.name]})}
                    isSelected={selected.includes(app.name)}
                  />
                ))}
            </IconGrid>
          </Window>
        )}
      </OsContext.Consumer>
    );
  }
}

export default ProgMan;
