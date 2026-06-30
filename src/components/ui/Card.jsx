import { useState } from "react";
import { useTheme } from "../../theme/index.js";
import { useWindowWidth } from "../../hooks/useWindowWidth.js";

export function Card({ children, style, glow, onClick, hover, className }) {
  const C = useTheme();
  const w = useWindowWidth();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={className}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.panel, border: `1px solid ${hovered && hover ? C.borderHover : C.border}`,
        borderRadius: 12, padding: w < 400 ? 14 : 20,
        boxShadow: glow ? `0 0 0 1px ${C.accent}20, 0 8px 32px rgba(0,0,0,0.4)` : "0 4px 16px rgba(0,0,0,0.3)",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.2s ease",
        ...(hovered && hover ? { transform: "translateY(-1px)", borderColor: C.borderHover } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
