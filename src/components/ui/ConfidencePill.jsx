import { useTheme } from "../../theme/index.js";

export function ConfidencePill({ score, size = "sm" }) {
  const C = useTheme();
  const color = score >= 85 ? C.emerald : score >= 70 ? C.amber : C.rose;
  const bg = score >= 85 ? C.emeraldGlow : score >= 70 ? C.amberGlow : C.roseGlow;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: bg, color, border: `1px solid ${color}30`,
      borderRadius: 6, padding: size === "sm" ? "2px 8px" : "4px 12px",
      fontSize: size === "sm" ? 11 : 13, fontWeight: 600,
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }} />
      {score}%
    </span>
  );
}
