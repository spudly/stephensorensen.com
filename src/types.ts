export interface AppDescriptor {
  name: string;
  icon?: React.ComponentType<any>;
  component: React.ComponentType<any>;
}

export interface ProcessDescriptor {
  id: string;
  app: string;
}

export interface WindowDescriptor {
  id: string;
  title: string;
  z: number;
}
