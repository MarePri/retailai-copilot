import { useState, useEffect } from "react";
import { useTheme } from "../../theme/index.js";

export function ProgressBar({ value, max = 100, color: colorProp, thin, animateOnMount = true }) {
  const C = useTheme();
  const color = colorProp ?? C.accent;
  const [fill, setFill] = useState(animateOnMount ? 0 : (value / max) * 100);
  useEffect(() => {
    if (!animateOnMount) {
      setFill((value / max) * 100);
      return;
    }
    const id = requestAnimationFrame(() => setFill((value / max) * 100));
    return () => cancelAnimationFrame(id);
  }, [value, max, animateOnMount]);
  return (
    <div style={{
      width: "100%", height: thin ? 3 : 6, background: C.border, borderRadius: 99,
      overflow: "hidden",
    }}>
      <div style={{
        width: `${fill}%`, height: "100%",
        background: `linear-gradient(90deg, ${color}cc, ${color})`,
        borderRadius: 99, transition: "width 0.8s ease",
      }} />
    </div>
  );
}
