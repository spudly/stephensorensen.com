import * as React from 'react';

interface AppDescriptor {
  name: string;
  icon?: React.ComponentType<any> | undefined;
  component: React.ComponentType<any>;
}

interface ProcessDescriptor {
  id: string;
  app: string;
}

interface WindowDescriptor {
  id: string;
  icon?: React.ComponentType<any> | undefined;
  title: string;
  z: number;
}

interface OsContextValues {
  // TODO: make singular
  apps: AppDescriptor[];
  processes: ProcessDescriptor[];
  windows: WindowDescriptor[];
  focusedWindowId: string | null;
  spawnProcess: (name: string) => void;
  killProcess: (id: string) => void;
  onWindowMount: (id: string, title: string, icon: React.ComponentType<any> | undefined) => void;
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

const OsContext = React.createContext(defaults);
const {Consumer, Provider} = OsContext;

interface WithContext {
  <Props>(Target: React.ComponentType<OsContextValues & Props>): (
    props: Exclude<Props, OsContextValues>
  ) => React.ReactElement<any>;
}

const withContext: WithContext = Target => props => (
  <Consumer>{context => <Target {...context} {...props} />}</Consumer>
);

export {OsContextValues, AppDescriptor, ProcessDescriptor, WindowDescriptor, withContext};
export default OsContext;
