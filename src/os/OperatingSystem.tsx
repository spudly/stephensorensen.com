import * as React from 'react';
import uniqueId from 'uuid/v4';
import Processes from './Processes';
import TaskBar from '../taskbar/TaskBar';
import Launcher from '../launcher/Launcher';
import LauncherIcon from '../launcher/SvgLauncherIcon';
import TicTacToe from '../tictactoe/TicTacToe';
import Calculator from '../calculator/Calculator';
import Nibbles from '../nibbles/Nibbles';
import Editor from '../editor/Editor';
import OsContext, {
  OsContextValues,
  ProcessDescriptor,
  WindowDescriptor,
  AppDescriptor,
} from './OsContext';
import TicTacToeIcon from '../tictactoe/SvgTicTacToeIcon';

interface Props {}

interface State {
  processes: ProcessDescriptor[];
  windows: WindowDescriptor[];
  apps: AppDescriptor[];
}

let nextWindowZ = 0;

class OperatingSystem extends React.Component<Props, State> {
  state: State = {
    apps: [
      {name: 'TaskBar', component: TaskBar},
      {name: 'TicTacToe', icon: TicTacToeIcon, component: TicTacToe},
      {name: 'Editor', icon: TicTacToeIcon, component: Editor},
      {name: 'Launcher', icon: LauncherIcon, component: Launcher},
      {name: 'Calculator', icon: LauncherIcon, component: Calculator},
      {name: 'Nibbles', icon: TicTacToeIcon, component: Nibbles},
    ],
    processes: [{id: uniqueId(), app: 'TaskBar'}, {id: uniqueId(), app: 'Launcher'}],
    windows: [],
  };

  render() {
    const {windows} = this.state;
    const focusedWindow = windows.reduce((maxWin, win) => {
      if (win.z > maxWin.z) {
        return win;
      }
      return maxWin;
    }, windows[0]);
    const context: OsContextValues = Object.assign({}, this.state, {
      focusedWindowId: focusedWindow ? focusedWindow.id : null,
      spawnProcess: this._spawnProcess,
      killProcess: this._killProcess,
      onWindowMount: this._handleWindowMount,
      onWindowUnmount: this._handleWindowUnmount,
      onWindowFocus: this._handleWindowFocus,
      getWindowZ: this._getWindowZ,
      setWindowTitle: this._setWindowTitle,
    });
    return (
      <OsContext.Provider value={context}>
        <Processes />
      </OsContext.Provider>
    );
  }

  _spawnProcess = (appName: string) =>
    this.setState(prevState => ({
      processes: [
        ...prevState.processes,
        {
          id: uniqueId(),
          app: appName,
        },
      ],
    }));

  _killProcess = (processId: string) =>
    this.setState(prevState => ({
      processes: prevState.processes.filter(p => p.id !== processId),
    }));

  _handleWindowMount = (id: string, title: string, icon?: React.ComponentType<any> | undefined) =>
    this.setState(prevState => ({
      windows: [...prevState.windows, {id, icon, title, z: nextWindowZ++}],
    }));

  _handleWindowUnmount = (id: string) =>
    this.setState(prevState => ({
      windows: prevState.windows.filter(win => win.id !== id),
    }));

  _handleWindowFocus = (id: string) =>
    this.setState(prevState => ({
      windows: prevState.windows.map(win => {
        if (win.id === id) {
          return {...win, z: nextWindowZ++};
        }
        return win;
      }),
    }));

  _setWindowTitle = (id: string, title: string) =>
    this.setState(prevState => ({
      windows: prevState.windows.map((win: WindowDescriptor) => {
        if (win.id === id) {
          // $FlowFixMe
          return Object.assign({}, win, {title});
        }
        return win;
      }),
    }));

  _getWindowZ = (id: string) => {
    const win = this.state.windows.find(w => w.id === id);
    if (win) {
      return win.z;
    }
  };
}

export default OperatingSystem;
