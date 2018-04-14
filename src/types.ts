export interface AppDescriptor {
  name: string;
  icon?: React.ComponentType<any> | undefined;
  component: React.ComponentType<any>;
}

export interface ProcessDescriptor {
  id: string;
  app: string;
}

export interface WindowDescriptor {
  id: string;
  icon?: React.ComponentType<any> | undefined;
  title: string;
  z: number;
}
