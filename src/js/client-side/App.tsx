import React from 'react';
import CodeEditor from './CodeEditor';

const App = () => (
  <>
    <CodeEditor initialValue={`// TODO: create website${'\n'.repeat(100)}`} />
  </>
);

export default App;
