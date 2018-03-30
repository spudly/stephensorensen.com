// @flow
import React, {type Node} from 'react';

type Props = {
  children: Node,
  width?: number,
  height?: number,
  select: (keys: string[]) => void,
};

const IconGrid = ({children, width, height, select}: Props) => (
  <div
    className="icon-grid"
    style={{height, width}}
    onClick={e => {
      if (e.target === e.currentTarget) {
        select([]);
      }
    }}
  >
    {children}
  </div>
);

export default IconGrid;
