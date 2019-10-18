import React/*, { useState, useCallback }*/ from "react";

type Props = {
  initialValue: string;
};

const CodeEditor = ({ initialValue }: Props) => {
  //const [value, setValue] = useState(initialValue);
  //const handleValueChange = useCallback(e => setValue(e.currentTarget.value), [
  //  setValue
  //]);
  //return <textarea value={value} onChange={handleValueChange} />;
  return (
    <pre style={{margin: 0, width: '100vw', height: '100vh'}}>// TODO: create website.
// In the meantime, checkout my presentation @ Connect.Tech 2019: <a href="https://react-patterns.stephensorensen.com/">Advanced React Design Patterns</a></pre>
  );
};

export default CodeEditor;
