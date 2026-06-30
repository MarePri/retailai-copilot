import { useTheme } from "../theme/index.js";
import { STORE } from "../data/store.js";
import { Card } from "../components/ui/Card.jsx";
import { AnimatedNumber } from "../components/ui/AnimatedNumber.jsx";
import { AILabel } from "../components/ui/AILabel.jsx";
import { Tag } from "../components/ui/Tag.jsx";
import { ConfidencePill } from "../components/ui/ConfidencePill.jsx";
import { ImpactBadge } from "../components/ui/ImpactBadge.jsx";

export function CommandCenter({ onNav }) {
  const C = useTheme();
  const kpis = [
    { label: "Sales vs LY", value: STORE.salesVsLY, delta: STORE.salesVsLY },
    { label: "Units vs LY", value: STORE.unitsVsLY, delta: STORE.unitsVsLY },
    { label: "Traffic vs LY", value: STORE.trafficVsLY, delta: STORE.trafficVsLY },
    { label: "Conversion", value: STORE.conversion, delta: STORE.conversionVsLY, noSign: true },
  ];

  const actions = [
    { icon: "🏷️", text: "Improve Licensed Collection visibility", owner: "Floor Manager", time: "20 min", impact: "+€140", conf: 88 },
    { icon: "👕", text: "Recover Women's Basics front table", owner: "VM Team", time: "45 min", impact: "+€80", conf: 82 },
    { icon: "👖", text: "Reorder Denim from stockroom zone 1005–1008", owner: "Stockroom", time: "30 min", impact: "+€60", conf: 79 },
  ];

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
      {/* Store Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          background: `linear-gradient(135deg, ${C.accent}12 0%, ${C.violet}07 50%, transparent 85%), ${C.panel}`,
          border: `1px solid ${C.border}`,
          borderRadius: 16, padding: "18px 20px",
          position: "relative", overflow: "hidden",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        }}>
          {/* bg glow */}
          <div style={{
            position: "absolute", top: -40, right: -40, width: 160, height: 160,
            background: `radial-gradient(circle, ${C.accent}18, transparent 70%)`,
            pointerEvents: "none",
          }} />
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, position: "relative", zIndex: 1 }}>
            <div>
              {/* Date pill */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 20, padding: "3px 10px", marginBottom: 11,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.emerald, display: "inline-block", flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: C.textMid, letterSpacing: "0.04em" }}>{STORE.date}</span>
              </div>
              {/* Store name row */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                  background: `linear-gradient(135deg, ${C.accent}, ${C.violet})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 4px 12px ${C.accent}35`,
                }}>
                  <span style={{ fontSize: 10, fontWeight: 900, color: "#fff", letterSpacing: "-0.01em" }}>P&B</span>
                </div>
                <h1 style={{ fontSize: 21, fontWeight: 800, color: C.text, letterSpacing: "-0.02em" }}>{STORE.name}</h1>
              </div>
              {/* Subtitle */}
              <div style={{ display: "flex", alignItems: "center", gap: 5, paddingLeft: 44 }}>
                <span style={{ fontSize: 10, color: C.accent, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>✦ Store Command Center <span style={{ color: C.textDim, fontWeight: 400, textTransform: "none" }}>· Simulated demo</span></span>
              </div>
            </div>
            {/* Right: Health + Tags */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 10, color: C.textMid, letterSpacing: "0.04em", marginBottom: 1 }}>Store Health</div>
                  <div style={{ fontSize: 10, color: C.amber, fontWeight: 600 }}>Visit in {STORE.visitIn}d</div>
                </div>
                <div style={{
                  background: `conic-gradient(${C.amber} ${STORE.health * 3.6}deg, ${C.border} 0deg)`,
                  width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.panel, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <AnimatedNumber value={STORE.health} noSign style={{ fontSize: 11, fontWeight: 700, color: C.amber }} />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <Tag color={C.amber}>Visit in {STORE.visitIn}d</Tag>
                <Tag color={C.rose}>Action needed</Tag>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="responsive-grid-2-380" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 16 }}>
        {kpis.map((k, i) => (
          <Card key={i} style={{
            padding: "14px 16px", opacity: 0,
            animation: "scaleIn 0.35s ease forwards", animationDelay: `${i * 70}ms`,
          }}>
            <div style={{ fontSize: 10, color: C.textMid, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{k.label}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <AnimatedNumber
                value={k.value}
                decimals={1}
                suffix="%"
                noSign={k.noSign}
                style={{ fontSize: 22, fontWeight: 700, color: k.delta < 0 ? C.rose : k.label === "Conversion" ? C.amber : C.emerald }}
              />
            </div>
            <div style={{ fontSize: 10, color: k.delta < 0 ? C.rose : C.emerald, marginTop: 2 }}>
              {k.delta > 0 ? "▲" : "▼"} vs last year
            </div>
          </Card>
        ))}
      </div>

      {/* AI Daily Briefing */}
      <Card glow style={{ marginBottom: 16, padding: 20 }}>
        <AILabel demo>AI Daily Briefing</AILabel>
        <div style={{ fontSize: 16, fontWeight: 600, color: C.white, marginBottom: 4 }}>Good morning, team ✦</div>
        <div style={{ fontSize: 13, color: C.textMid, marginBottom: 16, lineHeight: 1.6 }}>
          Store is <span style={{ color: C.rose, fontWeight: 600 }}>−3.8% vs LY</span>. The gap is driven by two underperforming families —
          but <span style={{ color: C.emerald, fontWeight: 600 }}>Licensed Collection is +14%</span> and the opportunity is real.
          Today's focus is clear.
        </div>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16, marginBottom: 16 }}>
          <div className="responsive-grid-2-380" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            <div style={{ background: C.roseGlow, borderRadius: 8, padding: "10px 12px", border: `1px solid ${C.rose}20` }}>
              <div style={{ fontSize: 10, color: C.rose, fontWeight: 600, marginBottom: 3, textTransform: "uppercase" }}>Main Drag</div>
              <div style={{ fontSize: 12, color: C.text }}>Women's Basics −11.4% → front table low visibility</div>
            </div>
            <div style={{ background: C.emeraldGlow, borderRadius: 8, padding: "10px 12px", border: `1px solid ${C.emerald}20` }}>
              <div style={{ fontSize: 10, color: C.emerald, fontWeight: 600, marginBottom: 3, textTransform: "uppercase" }}>Top Opportunity</div>
              <div style={{ fontSize: 12, color: C.text }}>Licensed Collection → move to prime floor position</div>
            </div>
          </div>
          <div style={{ background: C.accentSoft, borderRadius: 8, padding: "10px 14px", border: `1px solid ${C.accent}20`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 13, color: C.text }}>Expected gain if actions taken today</div>
            <AnimatedNumber value={220} prefix="+€" noSign style={{ fontSize: 20, fontWeight: 700, color: C.accent }} />
          </div>
          <div style={{ fontSize: 10, color: C.textDim, marginTop: 12, fontStyle: "italic", borderTop: `1px solid ${C.border}`, paddingTop: 10 }}>
            All insights are simulated demo data — no live store connection.
          </div>
        </div>

        <div style={{ marginBottom: 4 }}>
          <div style={{ fontSize: 11, color: C.textMid, marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Priority Actions</div>
          {actions.map((a, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 12,
              padding: "10px 0", borderBottom: i < actions.length - 1 ? `1px solid ${C.border}` : "none",
              opacity: 0, animation: "fadeSlideIn 0.4s ease forwards", animationDelay: `${i * 80}ms`,
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: 6, background: C.accentSoft,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, flexShrink: 0, marginTop: 1,
              }}>{i + 1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: C.text, marginBottom: 5, fontWeight: 500 }}>{a.text}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  <ConfidencePill score={a.conf} />
                  <ImpactBadge impact={a.impact} />
                  <span style={{ fontSize: 11, color: C.textMid }}>{a.owner} · {a.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick nav */}
      <div className="responsive-grid-2-380" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { id: "catchmeup", icon: "⚡", label: "Catch Me Up", sub: "Holiday/rotation briefing" },
          { id: "visit", icon: "📋", label: "Visit Readiness", sub: `${STORE.visitIn} days remaining` },
        ].map((n, i) => (
          <Card key={n.id} hover onClick={() => onNav(n.id)} style={{
            padding: "14px 16px", cursor: "pointer", opacity: 0,
            animation: "scaleIn 0.35s ease forwards", animationDelay: `${i * 100}ms`,
          }}>
            <div style={{ fontSize: 18, marginBottom: 6 }}>{n.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.white }}>{n.label}</div>
            <div style={{ fontSize: 11, color: C.textMid }}>{n.sub}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
