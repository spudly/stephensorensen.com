// @flow
import React, {type Element, type Node} from 'react';

type Props = {
  startLeft: number,
  startTop: number,
  render: (arg: {
    left: number,
    top: number,
    connectDragTarget: (element: Element<any>) => Element<any>,
  }) => Node,
};

type State = {
  left: number,
  top: number,
  dragging: ?{
    startTop: number,
    startLeft: number,
    startX: number,
    startY: number,
  },
};

class Movable extends React.Component<Props, State> {
  state = {
    left: this.props.startLeft,
    top: this.props.startTop,
    dragging: null,
  };

  componentDidMount() {
    window.addEventListener('mousemove', this._handleMouseMove);
    window.addEventListener('mouseup', this._handleMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this._handleMouseMove);
    window.removeEventListener('mouseup', this._handleMouseUp);
  }

  render() {
    return this.props.render({
      ...this.state,
      connectDragTarget: element =>
        React.cloneElement(element, {
          onMouseDown: this._handleMouseDown,
        }),
    });
  }

  _handleMouseDown = (event: SyntheticMouseEvent<HTMLElement>) => {
    this.setState({
      dragging: {
        startX: event.clientX,
        startY: event.clientY,
        startTop: this.state.top,
        startLeft: this.state.left,
      },
    });
  };

  _handleMouseMove = (event: SyntheticMouseEvent<HTMLElement>) => {
    const {dragging} = this.state;
    if (!dragging) {
      return;
    }
    this.setState({
      top: dragging.startTop + (event.clientY - dragging.startY),
      left: dragging.startLeft + (event.clientX - dragging.startX),
    });
  };

  _handleMouseUp = (event: SyntheticMouseEvent<HTMLElement>) => {
    const {dragging} = this.state;
    if (!dragging) {
      return;
    }
    this.setState({
      top: dragging.startTop + (event.clientY - dragging.startY),
      left: dragging.startLeft + (event.clientX - dragging.startX),
      dragging: null,
    });
  };
}

export default Movable;
