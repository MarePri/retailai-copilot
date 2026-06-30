import { useTheme } from "../../theme/index.js";

export function ImpactBadge({ impact, label }) {
  const C = useTheme();
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: C.accentSoft, color: C.accent,
      border: `1px solid ${C.accent}25`, borderRadius: 6,
      padding: "2px 8px", fontSize: 11, fontWeight: 600,
    }}>
      ↑ {impact}
      {label && <span style={{ color: C.textMid, fontWeight: 400 }}>{label}</span>}
    </span>
  );
}
