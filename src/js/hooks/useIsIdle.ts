import { useState, useEffect } from "react";

const useIsIdle = (timeout: number) => {
  const [isIdle, setIsIdle] = useState(false);
  const eventTypes = ["keydown", "keyup", "mousemove", "click"];
  useEffect(() => {
    let timerId: number;
    const handleActivity = () => {
      setIsIdle(false);
      window.clearTimeout(timerId);
      timerId = window.setTimeout(() => setIsIdle(true), timeout);
    };
    handleActivity();
    eventTypes.forEach(type => window.addEventListener(type, handleActivity));
    return () =>
      eventTypes.forEach(type =>
        window.removeEventListener(type, handleActivity)
      );
  }, []);
  return isIdle;
};

export default useIsIdle;
