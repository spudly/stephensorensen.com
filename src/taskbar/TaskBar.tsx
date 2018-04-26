// @flow
import * as React from 'react';
import OsContext, {OsContextValues} from '../os/OsContext';
import Clock from './Clock';

const TaskBar = () => (
  <OsContext.Consumer>
    {({apps, windows, onWindowFocus}: OsContextValues) => (
      <div className="taskbar">
        <button style={{display: 'block'}}>stuff</button>
        <div style={{background: '#ccc', textAlign: 'center', padding: '0.5em'}}>
          <Clock format="h:mm:ss A M/DD/YYYY" />
        </div>
        {windows.map(window => (
          <button
            className="taskbar__task"
            key={window.id}
            onClick={() => onWindowFocus(window.id)}
          >
            {window.icon && (
              <React.Fragment>
                <window.icon size={16} />{' '}
              </React.Fragment>
            )}
            {window.title}
          </button>
        ))}
      </div>
    )}
  </OsContext.Consumer>
);

export default TaskBar;
