// @flow
import * as React from 'react';
import OsContext, {OsContextValues} from '../os/OsContext';

type Props = {
  name: string;
  icon: React.ReactElement<any> | null;
  isSelected?: boolean;
  select?: (names: string[]) => void;
};

const Icon = ({name, select = () => {}, isSelected = false, icon}: Props) => (
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

export {Props};
export default Icon;
