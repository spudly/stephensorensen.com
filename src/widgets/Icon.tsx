// @flow
import * as React from 'react';
import OsContext, {OsContextValues} from '../OsContext';

type Props = {
  name: string;
  isSelected: boolean;
  icon: React.ReactElement<any> | null;
  select: (names: string[]) => void;
};

const Icon = ({name, select, isSelected, icon}: Props) => (
  <OsContext.Consumer>
    {({spawnProcess}: OsContextValues) => (
      <button
        onClick={() => select([name])}
        onDoubleClick={() => spawnProcess(name)}
        className={`icon ${isSelected ? 'icon--selected' : ''}`.trim()}
      >
        <div className="icon__grid">
          <div className="icon__image">{icon}</div>
          <div className="icon__text">{name}</div>
        </div>
      </button>
    )}
  </OsContext.Consumer>
);

export default Icon;
