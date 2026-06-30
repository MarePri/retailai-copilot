import { useTheme } from "../../theme/index.js";

export function Spinner() {
  const C = useTheme();
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", padding: "12px 0" }}>
      {[0, 1, 2].map(i => (
        <div key={i} className="thinking-dot" style={{
          width: 7, height: 7, borderRadius: "50%", background: C.accent,
          animationDelay: `${i * 0.15}s`,
        }} />
      ))}
    </div>
  );
}
