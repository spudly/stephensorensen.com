// @flow
import {type ComponentType} from 'react';

export type AppDescriptor = {|
  name: string,
  icon?: ComponentType<any>,
  component: ComponentType<any>,
|};

export type ProcessDescriptor = {|
  id: string,
  app: string,
|};

export type WindowDescriptor = {|
  id: string,
  title: string,
  z: number,
|};
