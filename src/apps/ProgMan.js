// @flow
import React from 'react';
import Window from '../widgets/Window';
import IconGrid from '../widgets/IconGrid';
import Icon from '../widgets/Icon';
import OsContext from '../OsContext';

type Props = {
  id: string,
};

type State = {
  selected: string[],
};

class ProgMan extends React.Component<Props, State> {
  state = {selected: []};

  render() {
    const {props: {id}, state: {selected}} = this;
    return (
      <OsContext.Consumer>
        {({apps, killProcess}) => (
          <Window
            title="Program Manager"
            close={() => {
              killProcess(id);
            }}
          >
            <IconGrid select={keys => this.setState({selected: keys})}>
              {apps
                .filter(app => !!app.icon)
                .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
                .map(app => (
                  <Icon
                    key={app.name}
                    name={app.name}
                    icon={<app.icon />}
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
