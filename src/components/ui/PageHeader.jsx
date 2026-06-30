import { useTheme } from "../../theme/index.js";
import { Tag } from "./Tag.jsx";

export function PageHeader({ icon, title, subtitle, tag, color: colorProp, onInfo, disclaimer }) {
  const C = useTheme();
  const color = colorProp ?? C.accent;
  return (
    <div style={{ marginBottom: 20, position: "relative", overflow: "hidden" }}>
      <div style={{
        background: `linear-gradient(135deg, ${color}14 0%, ${color}05 60%, transparent 100%), ${C.panel}`,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: "16px 18px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
      }}>
        <div style={{
          position: "absolute", top: -20, right: -20, width: 100, height: 100,
          background: `radial-gradient(circle at center, ${color}20, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div style={{
          width: 46, height: 46, borderRadius: 12, flexShrink: 0,
          background: `${color}18`, border: `1px solid ${color}35`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, boxShadow: `0 4px 16px ${color}20`,
        }}>{icon}</div>
        <div style={{ flex: 1, minWidth: 0, position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
            <span style={{ fontSize: 19, fontWeight: 700, color: C.text }}>{title}</span>
            {tag && <Tag color={color}>{tag}</Tag>}
          </div>
          <div style={{ fontSize: 12, color: C.textMid }}>{subtitle}</div>
          {disclaimer && (
            <div style={{ fontSize: 10, color: C.textDim, marginTop: 6, fontStyle: "italic", borderTop: `1px solid ${C.border}`, paddingTop: 6 }}>
              {disclaimer}
            </div>
          )}
        </div>
        {onInfo && (
          <button
            onClick={onInfo}
            title="What does this do?"
            style={{
              width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
              background: `${color}15`, border: `1px solid ${color}40`,
              color: color, fontSize: 14, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 2, position: "relative", transition: "background 0.15s, transform 0.15s",
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${color}28`; e.currentTarget.style.transform = "scale(1.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${color}15`; e.currentTarget.style.transform = "scale(1)"; }}
          >?</button>
        )}
      </div>
    </div>
  );
}
