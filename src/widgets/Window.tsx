// @flow
import * as React from 'react';
import * as uniqueId from 'uuid/v4';
import Movable from './Movable';
import CloseIcon from '../svg/SvgCloseIcon';
import OsContext, {OsContextValues} from '../OsContext';
import Component from './Component';

type Props = {
  children: React.ReactNode;
  close: () => void;
  title: string;
};

type State = {
  id: string;
  width: number;
  height: number;
};

class Window extends React.Component<Props, State> {
  state = {
    id: uniqueId(),
    width: 500, // TODO
    height: 300, // TODO
  };

  render() {
    const {props: {close, children, title}, state: {id, width, height}} = this;
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
            didMount={() => onWindowMount(id, title)}
            willUnmount={() => onWindowUnmount(id)}
            didUpdate={(prevProps: Props) => {
              if (prevProps.title !== title) {
                setWindowTitle(id, title);
              }
            }}
          >
            <Movable
              startLeft={300}
              startTop={150}
              render={({left, top, connectDragTarget}) => (
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
                  <header className="window__header">
                    <button className="window__header-button" onClick={() => close()}>
                      <CloseIcon />
                    </button>
                    {connectDragTarget(<h1 className="window__header-text">{title}</h1>)}
                    {/* <button style={{margin: 0, padding: 0, fontSize: 'inherit'}}>_</button> */}
                    {/* <button style={{margin: 0, padding: 0, fontSize: 'inherit'}}>[]</button> */}
                  </header>

                  {/* resize-top */}
                  {/* resize-left */}
                  {React.cloneElement(React.Children.only(children), {width, height})}
                  {/* resize-right */}
                  {/* resize-bottom */}
                </dialog>
              )}
            />
          </Component>
        )}
      </OsContext.Consumer>
    );
  }
}

export default Window;
