import { useState, useCallback } from "react";

const useRainbow = (colors: Array<string>): [string, () => void] => {
  const [colorIndex, setColorIndex] = useState(colors.indexOf(colors[0]));
  const next = useCallback(
    () => setColorIndex(idx => (idx + 1) % colors.length),
    [setColorIndex]
  );
  return [colors[colorIndex], next];
};

export default useRainbow;
