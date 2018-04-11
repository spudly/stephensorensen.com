// @flow
import * as React from 'react';

interface RenderPropProps {
  left: number;
  top: number;
  connectDragTarget: (element: React.ReactElement<any>) => React.ReactElement<any>;
}

type Props = {
  startLeft: number;
  startTop: number;
  render: (arg: RenderPropProps) => React.ReactNode;
};

type State = {
  left: number;
  top: number;
  dragging: {
    startTop: number;
    startLeft: number;
    startX: number;
    startY: number;
  } | null;
};

class Movable extends React.Component<Props, State> {
  state: State = {
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
    const renderPropProps: RenderPropProps = {
      left: this.state.left,
      top: this.state.top,
      connectDragTarget: (element: React.ReactElement<any>) =>
        React.cloneElement(element, {
          onMouseDown: this._handleMouseDown,
        }),
    };
    return this.props.render(renderPropProps);
  }

  _handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      dragging: {
        startX: event.clientX,
        startY: event.clientY,
        startTop: this.state.top,
        startLeft: this.state.left,
      },
    });
  };

  _handleMouseMove = (event: MouseEvent) => {
    const {dragging} = this.state;
    if (dragging) {
      this.setState({
        top: dragging.startTop + (event.clientY - dragging.startY),
        left: dragging.startLeft + (event.clientX - dragging.startX),
      });
    }
  };

  _handleMouseUp = (event: MouseEvent) => {
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
