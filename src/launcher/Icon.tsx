// @flow
import * as React from 'react';
import OsContext, {OsContextValues} from '../os/OsContext';

type Props = {
  name: string;
  icon: React.ReactElement<any> | null;
  isSelected?: boolean;
  select?: (names: string[]) => void;
  execute: () => void;
};

const Icon = ({name, select = () => {}, isSelected = false, icon, execute}: Props) => (
  <button
    onClick={() => select([name])}
    onDoubleClick={execute}
    className={`icon ${isSelected ? 'icon--selected' : ''}`.trim()}
  >
    <div className="icon__grid">
      <div className="icon__image">{icon}</div>
      <div className="icon__text">{name}</div>
    </div>
  </button>
);

export {Props};
export default Icon;
