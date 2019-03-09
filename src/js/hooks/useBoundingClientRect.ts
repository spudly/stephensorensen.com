import { useRef, useMemo, MutableRefObject } from "react";

const useBoundingClientRect = (): [
  MutableRefObject<HTMLDivElement | null>,
  DOMRect
] => {
  const ref = useRef(null as HTMLDivElement | null);
  const rect = useMemo(
    () =>
      ref.current
        ? DOMRect.fromRect(ref.current.getBoundingClientRect())
        : new DOMRect(),
    [ref.current]
  );
  return [ref, rect];
};

export default useBoundingClientRect;
