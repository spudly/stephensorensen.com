// @flow
import * as React from 'react';
import OsContext, {OsContextValues} from '../OsContext';
import Clock from '../widgets/Clock';

const TaskBar = () => (
  <OsContext.Consumer>
    {({windows, onWindowFocus}: OsContextValues) => (
      <div className="taskbar">
        <button style={{display: 'block'}}>s:OS</button>
        <div style={{background: '#ccc', textAlign: 'right', padding: '0.5em'}}>
          <Clock format="h:mm A" />
        </div>
        {windows.map(window => (
          <button key={window.id} onClick={() => onWindowFocus(window.id)}>
            {window.title}
          </button>
        ))}
      </div>
    )}
  </OsContext.Consumer>
);

export default TaskBar;
