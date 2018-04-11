import * as React from 'react';
import * as uniqueId from 'uuid/v4';
import Desktop from './Desktop';
import Processes from './Processes';
import TaskBar from './apps/TaskBar';
import ProgMan from './apps/ProgMan';
import ProgManIcon from './svg/SvgProgManIcon';
import TicTacToe from './apps/TicTacToe';
import Calc from './apps/Calc';
import {ProcessDescriptor, WindowDescriptor, AppDescriptor} from './types';
import OsContext, {OsContextValues} from './OsContext';
import TicTacToeIcon from './svg/SvgTicTacToeIcon';

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
      {name: 'Desktop', component: Desktop},
      {name: 'TaskBar', component: TaskBar},
      {name: 'TicTacToe', icon: TicTacToeIcon, component: TicTacToe},
      {name: 'ProgMan', icon: ProgManIcon, component: ProgMan},
      {name: 'Calculator', icon: ProgManIcon, component: Calc},
    ],
    processes: [
      {id: uniqueId(), app: 'Desktop'},
      {id: uniqueId(), app: 'TaskBar'},
      {id: uniqueId(), app: 'ProgMan'},
    ],
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
    const context: OsContextValues = {
      ...this.state,
      focusedWindowId: focusedWindow ? focusedWindow.id : null,
      spawnProcess: this._spawnProcess,
      killProcess: this._killProcess,
      onWindowMount: this._handleWindowMount,
      onWindowUnmount: this._handleWindowUnmount,
      onWindowFocus: this._handleWindowFocus,
      getWindowZ: this._getWindowZ,
      setWindowTitle: this._setWindowTitle,
    };
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

  _handleWindowMount = (id: string, title: string) =>
    this.setState(prevState => ({
      windows: [...prevState.windows, {id, title, z: nextWindowZ++}],
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
          return {...win, title};
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
