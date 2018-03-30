// @flow
// $FlowFixMe
import {createContext} from 'react';
import type {ProcessDescriptor, WindowDescriptor, AppDescriptor} from './types';

const noop = () => {};

type OsContextValues = {
  apps: AppDescriptor[],
  processes: ProcessDescriptor[],
  windows: WindowDescriptor[],
  focusedWindowId: ?string,
  spawnProcess: (name: string) => void,
  killProcess: (id: string) => void,
  onWindowMount: (id: string, title: string) => void,
  onWindowUnmount: (id: string) => void,
  onWindowFocus: (id: string) => void,
  getWindowZ: (id: string) => ?number,
  setWindowTitle: (id: string, title: string) => void,
};

const defaults: OsContextValues = {
  apps: [],
  processes: [],
  windows: [],
  focusedWindowId: null,
  spawnProcess: noop,
  killProcess: noop,
  onWindowMount: noop,
  onWindowUnmount: noop,
  onWindowFocus: noop,
  getWindowZ: noop,
  setWindowTitle: noop,
};

const OsContext = createContext(defaults);

export type {OsContextValues};
export default OsContext;
