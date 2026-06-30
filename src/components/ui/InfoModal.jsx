import { useTheme } from "../../theme/index.js";

export function InfoModal({ onClose, title, icon, color, tagline, description, features, highlight }) {
  const C = useTheme();
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 500,
        background: "rgba(0,0,0,0.65)", backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px 16px",
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="fade-in"
        style={{
          maxWidth: 440, width: "100%",
          background: C.panel, border: `1px solid ${color}40`,
          borderRadius: 20, overflow: "hidden",
          boxShadow: `0 0 0 1px ${color}20, 0 24px 64px rgba(0,0,0,0.55)`,
        }}
      >
        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${color}22 0%, ${color}0a 55%, transparent 100%)`,
          padding: "22px 20px 18px",
          borderBottom: `1px solid ${C.border}`,
          position: "relative",
        }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 14, right: 14,
              width: 28, height: 28, borderRadius: 8,
              background: C.surface, border: `1px solid ${C.border}`,
              color: C.textMid, fontSize: 18, cursor: "pointer", lineHeight: 1,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >×</button>
          <div style={{ fontSize: 36, marginBottom: 10 }}>{icon}</div>
          <div style={{ fontSize: 21, fontWeight: 800, color: C.text, marginBottom: 5 }}>{title}</div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: `${color}15`, border: `1px solid ${color}30`,
            borderRadius: 20, padding: "3px 10px",
            fontSize: 11, fontWeight: 700, color: color,
            textTransform: "uppercase", letterSpacing: "0.07em",
          }}>✦ {tagline}</div>
        </div>

        {/* Body */}
        <div style={{ padding: "18px 20px 22px" }}>
          <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.75, marginBottom: 18 }}>
            {description}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 18 }}>
            {features.map((f, i) => (
              <div key={i} style={{
                display: "flex", gap: 12, alignItems: "flex-start",
                background: C.surface, borderRadius: 11, padding: "11px 13px",
                border: `1px solid ${C.border}`,
                animation: `fadeSlideIn 0.35s ease forwards`,
                animationDelay: `${i * 80}ms`,
                opacity: 0,
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                  background: `${color}15`, border: `1px solid ${color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16,
                }}>{f.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 2 }}>{f.title}</div>
                  <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: `${color}0e`, border: `1px solid ${color}28`,
            borderRadius: 11, padding: "12px 14px",
            display: "flex", gap: 10, alignItems: "flex-start",
          }}>
            <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>✦</span>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.65 }}>{highlight}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
