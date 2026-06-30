import { useTheme } from "../theme/index.js";
import { Card } from "../components/ui/Card.jsx";
import { AILabel } from "../components/ui/AILabel.jsx";
import { PageHeader } from "../components/ui/PageHeader.jsx";
import { AnimatedNumber } from "../components/ui/AnimatedNumber.jsx";
import { ProgressBar } from "../components/ui/ProgressBar.jsx";

export function VisitReadiness() {
  const C = useTheme();
  const areas = [
    { name: "Commercial Readiness", score: 64, color: C.amber, issues: ["Sales gap vs LY not closed", "Licensed Collection below potential position"] },
    { name: "Collection Integrity", score: 71, color: C.amber, issues: ["Urban Summer hero product substituted", "Women's Basics front table incomplete"] },
    { name: "Operations", score: 82, color: C.emerald, issues: ["Buffer basket labelling complete", "Stockroom zoning updated after Thursday delivery"] },
    { name: "Customer Experience", score: 77, color: C.emerald, issues: ["Fitting rooms restocked", "Queue management on peak days still manual"] },
  ];

  const overall = Math.round(areas.reduce((a, b) => a + b.score, 0) / areas.length);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
      <PageHeader
        icon="📋"
        title="Visit Readiness"
        subtitle="Regional visit in 7 days. Here's where you stand."
        color={C.amber}
        disclaimer="Simulated demo — all scores and plans are deterministic."
      />

      {/* Overall Score */}
      <Card glow style={{ marginBottom: 16, textAlign: "center" }}>
        <AILabel demo>Overall Readiness</AILabel>
        <AnimatedNumber value={overall} noSign style={{ fontSize: 64, fontWeight: 900, color: C.amber, lineHeight: 1 }} />
        <div style={{ fontSize: 13, color: C.textMid, marginBottom: 16 }}>out of 100</div>
        <ProgressBar value={overall} color={C.amber} />
        <div style={{ fontSize: 12, color: C.textMid, marginTop: 12, lineHeight: 1.6 }}>
          Store is <span style={{ color: C.amber, fontWeight: 600 }}>visit-ready with conditions</span>. Commercial and collection gaps need closing in the next 5 days.
        </div>
      </Card>

      {/* Area Breakdown */}
      <div style={{ marginBottom: 16 }}>
        {areas.map((a, i) => (
          <Card key={i} style={{
            marginBottom: 10, opacity: 0,
            animation: "scaleIn 0.35s ease forwards", animationDelay: `${i * 80}ms`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.white }}>{a.name}</div>
              <div>
                <AnimatedNumber value={a.score} noSign style={{ fontSize: 28, fontWeight: 800, color: a.color }} />
                <span style={{ fontSize: 12, color: C.textMid }}>/100</span>
              </div>
            </div>
            <ProgressBar value={a.score} color={a.color} />
            <div style={{ marginTop: 10 }}>
              {a.issues.map((issue, j) => (
                <div key={j} style={{ display: "flex", gap: 8, marginTop: 5 }}>
                  <span style={{ color: a.color === C.emerald ? C.emerald : C.amber, fontSize: 11 }}>{a.color === C.emerald ? "✓" : "!"}</span>
                  <span style={{ fontSize: 12, color: C.textMid }}>{issue}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* 7-Day Plan */}
      <Card>
        <AILabel demo>7-Day Action Plan</AILabel>
        <div style={{ position: "relative" }}>
          {/* Timeline spine */}
          <div style={{
            position: "absolute", left: 19, top: 40, bottom: 8, width: 2,
            background: `linear-gradient(to bottom, ${C.amber}60, ${C.accent}50, ${C.textDim}30, ${C.emerald}60)`,
            borderRadius: 1,
          }} />
          {[
            {
              day: "Today", badge: "D-7", color: C.amber, icon: "🔥",
              actions: [
                { icon: "↕", text: "Move Women's Basics to front table" },
                { icon: "📦", text: "Restock Denim from H-1005/1008" },
              ],
            },
            {
              day: "Tomorrow", badge: "D-6", color: C.accent, icon: "📌",
              actions: [
                { icon: "✦", text: "Reposition Licensed Collection to prime floor" },
                { icon: "🔧", text: "Complete Urban Summer rebuild" },
              ],
            },
            {
              day: "Days 3–5", badge: "D-5 → D-3", color: C.textMid, icon: "📋",
              actions: [
                { icon: "🔍", text: "Full VM review with collection dossiers" },
                { icon: "✓", text: "Operations audit: buffer baskets B1–B6" },
              ],
            },
            {
              day: "Final Push", badge: "D-2 / D-1", color: C.emerald, icon: "🎯",
              actions: [
                { icon: "📊", text: "Commercial performance review" },
                { icon: "✓", text: "Final readiness walkthrough" },
              ],
            },
          ].map((p, i) => (
            <div key={i} style={{
              display: "flex", gap: 14, marginBottom: i < 3 ? 18 : 0, position: "relative",
              opacity: 0, animation: "fadeSlideIn 0.45s ease forwards", animationDelay: `${i * 120}ms`,
            }}>
              {/* Node */}
              <div style={{ flexShrink: 0, width: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `${p.color}16`, border: `1.5px solid ${p.color}45`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 17, zIndex: 1, position: "relative",
                  boxShadow: i === 0 ? `0 0 14px ${p.color}35` : "none",
                }}>{p.icon}</div>
              </div>
              {/* Content */}
              <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: p.color }}>{p.day}</span>
                  <span style={{
                    fontSize: 10, color: p.color,
                    background: `${p.color}14`, border: `1px solid ${p.color}28`,
                    borderRadius: 4, padding: "1px 7px", fontWeight: 600,
                    letterSpacing: "0.04em", fontFamily: "'JetBrains Mono', monospace",
                  }}>{p.badge}</span>
                </div>
                <div style={{
                  background: `${p.color}08`, border: `1px solid ${p.color}20`,
                  borderRadius: 10, padding: "10px 12px",
                  display: "flex", flexDirection: "column", gap: 8,
                }}>
                  {p.actions.map((a, j) => (
                    <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{
                        width: 22, height: 22, borderRadius: 5, flexShrink: 0,
                        background: `${p.color}18`, border: `1px solid ${p.color}28`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, color: p.color, marginTop: 1,
                      }}>{a.icon}</span>
                      <span style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>{a.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
