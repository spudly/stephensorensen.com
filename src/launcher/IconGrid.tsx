// @flow
import * as React from 'react';
import Icon, {Props as IconProps} from './Icon';

interface Props {
  children: React.ReactNode;
  width?: number;
  height?: number;
}

interface State {
  selected: string[];
}

class IconGrid extends React.Component<Props> {
  state: State = {selected: []};

  render() {
    const {props: {children, width, height}, state: {selected}} = this;
    return (
      <div
        className="icon-grid"
        style={{height, width}}
        onClick={e => {
          if (e.target === e.currentTarget) {
            this._select([]);
          }
        }}
      >
        {React.Children.map(children, child => {
          if (typeof child === 'string' || typeof child === 'number') {
            return child;
          }
          return React.cloneElement(child, {
            select: () => this._select([child.props.name]),
            isSelected: selected.includes(child.props.name),
          });
        })}
      </div>
    );
  }

  _select = (selected: string[]) => this.setState({selected});
}

export default IconGrid;
