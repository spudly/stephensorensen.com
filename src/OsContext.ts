import {createContext} from 'react';
import {ProcessDescriptor, WindowDescriptor, AppDescriptor} from './types';

interface OsContextValues {
  apps: AppDescriptor[];
  processes: ProcessDescriptor[];
  windows: WindowDescriptor[];
  focusedWindowId: string | null;
  spawnProcess: (name: string) => void;
  killProcess: (id: string) => void;
  onWindowMount: (id: string, title: string) => void;
  onWindowUnmount: (id: string) => void;
  onWindowFocus: (id: string) => void;
  getWindowZ: (id: string) => number | undefined;
  setWindowTitle: (id: string, title: string) => void;
}

const defaults: OsContextValues = {
  apps: [],
  processes: [],
  windows: [],
  focusedWindowId: null,
  spawnProcess: () => undefined,
  killProcess: () => undefined,
  onWindowMount: () => undefined,
  onWindowUnmount: () => undefined,
  onWindowFocus: () => undefined,
  getWindowZ: () => undefined,
  setWindowTitle: () => undefined,
};

const OsContext = createContext(defaults);

export {OsContextValues};
export default OsContext;
