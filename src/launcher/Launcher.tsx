// @flow
import * as React from 'react';
import Window from '../os/Window';
import IconGrid from './IconGrid';
import Icon from './Icon';
import OsContext, {OsContextValues} from '../os/OsContext';
import LauncherIcon from './SvgLauncherIcon';
import Desktop from './Desktop';
import uuid from 'uuid/v4';

interface Props {}

interface State {
  windowIds: string[];
}

class Launcher extends React.Component<Props, State> {
  state = {
    windowIds: [],
  };

  render() {
    const {state: {windowIds}} = this;
    return (
      <React.Fragment>
        <Desktop addLauncherWindow={this._addWindow} />
        <OsContext.Consumer>
          {({apps, spawnProcess}: OsContextValues) =>
            windowIds.map(windowId => (
              <Window
                key={windowId}
                title="Launcher"
                close={this._closeWindow(windowId)}
                icon={LauncherIcon}
              >
                <IconGrid>
                  {apps
                    .filter(app => !!app.icon)
                    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
                    .map(app => (
                      <Icon
                        key={app.name}
                        name={app.name}
                        icon={app.icon ? <app.icon /> : null}
                        execute={() => spawnProcess(app.name)}
                      />
                    ))}
                </IconGrid>
              </Window>
            ))
          }
        </OsContext.Consumer>
      </React.Fragment>
    );
  }

  _closeWindow = (id: string) => () =>
    this.setState(state => ({
      ...state,
      windowIds: state.windowIds.filter(windowId => windowId !== id),
    }));

  _addWindow = () =>
    this.setState(state => ({
      ...state,
      windowIds: [...this.state.windowIds, uuid()],
    }));
}

export default Launcher;
