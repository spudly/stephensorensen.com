// @flow
import * as React from 'react';
import * as uniqueId from 'uuid/v4';
import CloseIcon from '../svg/SvgCloseIcon';
import OsContext, {OsContextValues} from '../OsContext';
import Component from './Component';

type Props = {
  children: React.ReactNode;
  close: () => void;
  title: string;
  icon?: React.ComponentType<any>;
};

type Direction = 'n' | 'e' | 's' | 'w' | 'nw' | 'ne' | 'se' | 'sw';
const directions: Direction[] = ['n', 'e', 's', 'w', 'nw', 'ne', 'se', 'sw'];

type State = {
  id: string;
  width: number;
  height: number;
  top: number;
  left: number;
  dragging: {
    startTop: number;
    startLeft: number;
    startX: number;
    startY: number;
  } | null;
  resizing: {
    direction: Direction;
    startX: number;
    startY: number;
    startTop: number;
    startLeft: number;
    startWidth: number;
    startHeight: number;
  } | null;
};

class Window extends React.Component<Props, State> {
  state: State = {
    id: uniqueId(),
    width: 500, // TODO: get initial width/height from props
    height: 300, // TODO: get initial width/height from props
    left: 300, // TODO: how do we determine start value?
    top: 150, // TODO: how do we determine start value?
    dragging: null,
    resizing: null,
  };

  componentDidMount() {
    window.addEventListener('mousemove', this._handleMouseMove);
    window.addEventListener('mouseup', this._handleMoveEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this._handleMouseMove);
    window.removeEventListener('mouseup', this._handleMoveEnd);
  }

  render() {
    const {props: {close, children, title, icon}, state: {id, width, height, left, top}} = this;
    return (
      <OsContext.Consumer>
        {({
          onWindowFocus,
          focusedWindowId,
          onWindowMount,
          onWindowUnmount,
          getWindowZ,
          setWindowTitle,
        }: OsContextValues) => (
          <Component
            {...this.props}
            didMount={() => onWindowMount(id, title, icon)}
            willUnmount={() => onWindowUnmount(id)}
            didUpdate={(prevProps: Props) => {
              if (prevProps.title !== title) {
                setWindowTitle(id, title);
              }
            }}
          >
            <dialog
              open
              className={`window ${focusedWindowId === id ? 'window--focused' : ''}`.trim()}
              style={{left, top, zIndex: getWindowZ(id)}}
              onMouseDown={() => {
                if (focusedWindowId !== id) {
                  onWindowFocus(id);
                }
              }}
            >
              {React.cloneElement(React.Children.only(children), {width, height})}

              {directions.map(direction => (
                <div
                  key={direction}
                  className={`window__resize window__resize--${direction}`}
                  draggable={false}
                  {...this._getResizeEventHandlers(direction)}
                />
              ))}

              <header className="window__header">
                <button className="window__header-button" onClick={() => close()}>
                  <CloseIcon />
                </button>
                <h1
                  className="window__header-text"
                  onMouseDown={this._handleHeaderMouseDown}
                  onTouchStart={this._handleHeaderTouchStart}
                  onTouchMove={this._handleTouchMove}
                  onTouchEnd={this._handleMoveEnd}
                  draggable={false}
                >
                  {title}
                </h1>
                {/* <button style={{margin: 0, padding: 0, fontSize: 'inherit'}}>_</button> */}
                {/* <button style={{margin: 0, padding: 0, fontSize: 'inherit'}}>[]</button> */}
              </header>
            </dialog>
          </Component>
        )}
      </OsContext.Consumer>
    );
  }

  _getResizeEventHandlers = (direction: Direction) => ({
    onMouseDown: this._handleResizeMouseDown(direction),
    onTouchStart: this._handleResizeTouchStart(direction),
    onTouchMove: this._handleTouchMove,
    onTouchEnd: this._handleMoveEnd,
  });

  _handleHeaderTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    this._handleMoveStart(touch.clientX, touch.clientY);
  };

  _handleHeaderMouseDown = (event: React.MouseEvent<HTMLElement>) =>
    this._handleMoveStart(event.clientX, event.clientY);

  _handleMoveStart = (x: number, y: number) => {
    this.setState({
      dragging: {
        startX: x,
        startY: y,
        startTop: this.state.top,
        startLeft: this.state.left,
      },
    });
  };

  _handleResizeTouchStart = (direction: Direction) => (event: React.TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    this._handleResizeStart(direction, touch.clientX, touch.clientY);
  };

  _handleResizeMouseDown = (direction: Direction) => (event: React.MouseEvent<HTMLElement>) => {
    this._handleResizeStart(direction, event.clientX, event.clientY);
  };

  _handleResizeStart = (direction: Direction, x: number, y: number) => {
    this.setState({
      resizing: {
        direction,
        startX: x,
        startY: y,
        startTop: this.state.top,
        startLeft: this.state.left,
        startWidth: this.state.width,
        startHeight: this.state.height,
      },
    });
  };

  _handleTouchMove = (event: React.TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    this._handleMove(touch.clientX, touch.clientY);
  };

  _handleMouseMove = (event: MouseEvent) => {
    this._handleMove(event.clientX, event.clientY);
  };

  _handleMove = (x: number, y: number) => {
    const {dragging, resizing} = this.state;
    if (dragging) {
      this.setState({
        top: dragging.startTop + (y - dragging.startY),
        left: dragging.startLeft + (x - dragging.startX),
      });
    }
    if (resizing) {
      let {top, left, width, height} = this.state;
      const diffX = x - resizing.startX;
      const diffY = y - resizing.startY;
      switch (resizing.direction) {
        case 'nw':
          left = resizing.startLeft + diffX;
          width = resizing.startWidth - diffX;
          top = resizing.startTop + diffY;
          height = resizing.startHeight - diffY;
          break;
        case 'n':
          top = resizing.startTop + diffY;
          height = resizing.startHeight - diffY;
          break;
        case 'ne':
          top = resizing.startTop + diffY;
          height = resizing.startHeight - diffY;
          width = resizing.startWidth + diffX;
          break;
        case 'e':
          width = resizing.startWidth + diffX;
          break;
        case 'se':
          width = resizing.startWidth + diffX;
          height = resizing.startHeight + diffY;
          break;
        case 's':
          height = resizing.startHeight + diffY;
          break;
        case 'sw':
          left = resizing.startLeft + diffX;
          width = resizing.startWidth - diffX;
          height = resizing.startHeight + diffY;
          break;
        case 'w':
          left = resizing.startLeft + diffX;
          width = resizing.startWidth - diffX;
          break;
      }
      this.setState({top, left, width, height});
    }
  };

  _handleMoveEnd = (event: MouseEvent | React.TouchEvent<HTMLElement>) => {
    const {dragging, resizing} = this.state;
    if (dragging || resizing) {
      this.setState({dragging: null, resizing: null});
    }
  };
}

export default Window;
