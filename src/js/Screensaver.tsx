import React, { useState, useEffect } from "react";
import useBoundingClientRect from "./hooks/useBoundingClientRect";
import useRainbow from "./hooks/useRainbow";
import useViewport from "./hooks/useViewport";

const COLORS = ["red", "green", "blue", "indigo", "violet"];

const Screensaver = () => {
  const [color, nextColor] = useRainbow(COLORS);
  const [vw, vh] = useViewport();
  const [ref, { width, height }] = useBoundingClientRect();
  const [{ x, y }, setPosition] = useState({
    x: Math.floor(Math.random() * (vw - width)),
    xm: Math.random() > 0.5 ? 1.5 : -1.5,
    y: Math.floor(Math.random() * (vh - width)),
    ym: Math.random() > 0.5 ? 1.5 : -1.5
  });
  useEffect(() => {
    const animate = () => {
      setPosition(p => {
        const isCrashingLeft = p.x <= 0 && p.xm < 0;
        const isCrashingRight = p.x + width >= vw && p.xm > 0;
        const isCrashingTop = p.y <= 0 && p.ym < 0;
        const isCrashingBottom = p.y + height >= vh && p.ym > 0;
        const np = { ...p };
        if (isCrashingLeft || isCrashingRight) {
          np.xm *= -1;
          nextColor();
        }
        if (isCrashingTop || isCrashingBottom) {
          np.ym *= -1;
          nextColor();
        }
        np.x = Math.min(Math.max(p.x + np.xm, 0), vw - width);
        np.y = Math.min(Math.max(p.y + np.ym, 0), vh - height);
        return np;
      });
    };
    const intervalId = setInterval(animate, 1000 / 60);
    return () => clearInterval(intervalId);
  }, [vw, vh, width, height]);
  return (
    <div className="screensaver">
      <div
        ref={ref}
        className="screensaver__bouncer"
        style={{
          backgroundColor: color,
          transform: `translate(${x}px, ${y}px)`
        }}
      >
        <div className="screensaver__dvd">SJS</div>
        <div className="screensaver__disc" />
        <div className="screensaver__video">website</div>
      </div>
    </div>
  );
};

export default Screensaver;
