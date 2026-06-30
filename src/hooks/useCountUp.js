import { useState, useEffect, useRef } from "react";

export function useCountUp(target, { duration = 900, decimals = 0 } = {}) {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const start = performance.now();
    let frameId;
    let completed = false;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setValue(parseFloat((target * eased).toFixed(decimals)));
      if (t < 1) frameId = requestAnimationFrame(tick);
      else {
        completed = true;
        setValue(target);
      }
    };
    frameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameId);
      if (!completed) hasAnimated.current = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return value;
}
