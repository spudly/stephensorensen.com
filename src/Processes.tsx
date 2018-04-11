import * as React from 'react';
import OsContext, {OsContextValues} from './OsContext';

const Processes = () => (
  <OsContext.Consumer>
    {({processes, apps}: OsContextValues) =>
      processes.map(process => {
        const app = apps.find(({name}) => name === process.app);
        if (!app) {
          throw new Error(`Unknown App: ${app}`);
        }
        return <app.component key={process.id} id={process.id} />;
      })
    }
  </OsContext.Consumer>
);

export default Processes;
