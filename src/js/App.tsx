import React from "react";
import CodeEditor from "./CodeEditor";
import Screensaver from "./Screensaver";
import useIsIdle from "./hooks/useIsIdle";

const App = () => {
  const isIdle = useIsIdle(30000);
  return (
    <>
      <CodeEditor initialValue={`// TODO: create website${"\n".repeat(100)}`} />
      {isIdle && <Screensaver />}
    </>
  );
};

export default App;
