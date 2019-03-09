import { useCallback, useEffect, useState } from "react";

const useViewport = (): [number, number] => {
  const getSize = useCallback(
    () => ({ width: window.innerWidth, height: window.innerHeight }),
    []
  );
  const [{ width, height }, setSize] = useState(getSize());
  useEffect(() => {
    const handleResize = () => {
      setSize(getSize());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return [width, height];
};

export default useViewport;
