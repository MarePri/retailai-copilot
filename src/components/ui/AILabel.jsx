import { useTheme } from "../../theme/index.js";

export function AILabel({ children, demo }) {
  const C = useTheme();
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      color: C.accent, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
      textTransform: "uppercase", marginBottom: 8,
    }}>
      <span style={{
        width: 16, height: 16, borderRadius: 4, background: C.accentSoft,
        border: `1px solid ${C.accent}30`, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 9,
      }}>✦</span>
      {children}
      {demo !== false && (
        <span style={{
          fontSize: 9, fontWeight: 500, color: C.textDim,
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 4, padding: "1px 6px", textTransform: "none",
          letterSpacing: "0.04em",
        }}>
          simulated
        </span>
      )}
    </div>
  );
}
