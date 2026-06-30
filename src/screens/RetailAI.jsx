import { useState, useRef } from "react";
import { useTheme } from "../theme/index.js";
import { useWindowWidth } from "../hooks/useWindowWidth.js";
import { Card } from "../components/ui/Card.jsx";
import { AILabel } from "../components/ui/AILabel.jsx";
import { Tag } from "../components/ui/Tag.jsx";
import { PageHeader } from "../components/ui/PageHeader.jsx";
import { InfoModal } from "../components/ui/InfoModal.jsx";
import { AnimatedNumber } from "../components/ui/AnimatedNumber.jsx";
import { Spinner } from "../components/ui/Spinner.jsx";
import { LoadingButton } from "../components/ui/LoadingButton.jsx";
import { ConfidencePill } from "../components/ui/ConfidencePill.jsx";
import { ImpactBadge } from "../components/ui/ImpactBadge.jsx";
import { ProgressBar } from "../components/ui/ProgressBar.jsx";
import { STORE, FAMILIES } from "../data/store.js";
import { quickQuestions, getDeterministicReply } from "../data/retailai.js";

// ─── RETAILAI — EXPLAIN THE BUSINESS ─────────────────────────────────────────
export function RetailAI() {
  const C = useTheme();
  const w = useWindowWidth();
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      text: "Store is −3.8% vs LY. I've analysed the last 7 days. Ask me anything — or use a quick question below.",
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [showInfo, setShowInfo] = useState(false);
  const chatRef = useRef(null);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput("");
    setChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 700));
    const reply = getDeterministicReply(userMsg);
    setChatMessages(prev => [...prev, { role: "assistant", text: reply }]);
    setLoading(false);
    setTimeout(() => chatRef.current?.scrollTo({ top: 9999, behavior: "smooth" }), 100);
  };

  const tabs = [
    { id: "chat", label: "Ask RetailAI" },
    { id: "families", label: "Family View" },
    { id: "forecast", label: "Forecast" },
  ];

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
      {showInfo && (
        <InfoModal
          onClose={() => setShowInfo(false)}
          icon="📊"
          title="RetailAI"
          color={C.emerald}
          tagline="Commercial Intelligence"
          description="RetailAI is your store's commercial brain. It knows your numbers, understands the trends behind them, and gives you a straight answer when you ask 'why are we behind?' — no spreadsheets required. (Simulated demo — no live connection.)"
          features={[
            { icon: "💬", title: "Ask Anything", desc: "A conversational interface that knows your store's last 7 days of data. Ask about families, conversion, traffic — it responds like a retail expert, not a dashboard." },
            { icon: "🔬", title: "Family View", desc: "Deep-dive into each product family's performance with root-cause analysis and a specific, actionable fix for every underperformer." },
            { icon: "🔮", title: "Closing Forecast", desc: "See two scenarios — do nothing vs. take action — with projected end-of-day vs. LY. Know exactly what the next 2 hours are worth." },
          ]}
          highlight="The gap between −3.8% and breaking even is often just 2 targeted actions. RetailAI tells you exactly which ones — and why they'll work today."
        />
      )}
      <PageHeader
        icon="📊"
        title="RetailAI"
        subtitle="Commercial Intelligence"
        tag="HERO DEMO"
        color={C.emerald}
        onInfo={() => setShowInfo(true)}
        disclaimer="Simulated demo — all responses are deterministic, not live."
      />

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: w < 400 ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>
        {[
          { label: "Sales", value: -3.8, color: C.rose },
          { label: "Units", value: -2.1, color: C.rose },
          { label: "Traffic", value: -1.4, color: C.amber },
          { label: "Conv.", value: 18.3, color: C.amber, noSign: true },
        ].map((k, i) => (
          <div key={i} style={{
            background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 12px",
            opacity: 0, animation: "scaleIn 0.35s ease forwards", animationDelay: `${i * 60}ms`,
          }}>
            <div style={{ fontSize: 9, color: C.textMid, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{k.label}</div>
            <AnimatedNumber value={k.value} decimals={1} suffix="%" noSign={k.noSign} style={{ fontSize: 16, fontWeight: 700, color: k.color }} />
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, background: C.surface, padding: 4, borderRadius: 10, border: `1px solid ${C.border}` }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} className="btn-hover" style={{
            flex: 1, padding: "8px 4px", borderRadius: 7, border: "none",
            background: activeTab === t.id ? C.panel : "transparent",
            color: activeTab === t.id ? C.white : C.textMid,
            fontSize: 12, fontWeight: activeTab === t.id ? 600 : 400, cursor: "pointer",
            transition: "all 0.15s",
          }}>{t.label}</button>
        ))}
      </div>

      {activeTab === "chat" && (
        <div key="chat" className="fade-in">
          {/* Chat */}
          <Card style={{ marginBottom: 12, padding: 0, overflow: "hidden" }}>
            <div ref={chatRef} style={{ height: 340, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {chatMessages.map((m, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                }} className="slide-in">
                  {m.role === "assistant" && (
                    <div style={{
                      width: 26, height: 26, borderRadius: 7, background: `${C.emerald}15`,
                      border: `1px solid ${C.emerald}30`, display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 12, flexShrink: 0, marginRight: 8, marginTop: 2,
                    }}>✦</div>
                  )}
                  <div style={{
                    maxWidth: "80%", padding: "10px 14px", borderRadius: m.role === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                    background: m.role === "user" ? `${C.accent}20` : C.surface,
                    border: `1px solid ${m.role === "user" ? C.accent + "30" : C.border}`,
                    fontSize: 13, color: C.text, lineHeight: 1.65,
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: 7, background: `${C.emerald}15`,
                    border: `1px solid ${C.emerald}30`, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 12, flexShrink: 0,
                  }}>✦</div>
                  <div style={{ padding: "10px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "12px 12px 12px 4px" }}>
                    <Spinner />
                  </div>
                </div>
              )}
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", gap: 8 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Ask about your store…"
                inputMode="text"
                style={{
                  flex: 1, padding: "11px 12px", background: C.bg, border: `1px solid ${C.border}`,
                  borderRadius: 8, color: C.text, fontSize: 16, outline: "none", fontFamily: "inherit",
                }}
              />
              <LoadingButton loading={loading} onClick={() => sendMessage()} disabled={!input.trim()} style={{
                padding: "11px 16px", minWidth: 44, minHeight: 44, background: C.accent, border: "none", borderRadius: 8,
                color: C.white, fontSize: 16, fontWeight: 600,
                opacity: loading || !input.trim() ? 0.5 : 1,
              }}>→</LoadingButton>
            </div>
          </Card>

          {/* Data Source Note */}
          <div style={{ fontSize: 10, color: C.textDim, marginBottom: 12, fontStyle: "italic", textAlign: "center" }}>
            All responses are deterministic demo data — no live store system connection.
          </div>

          {/* Simulated notice */}
          <div style={{
            fontSize: 10, color: C.textDim, textAlign: "center", marginBottom: 8,
            padding: "6px 12px", background: `${C.amber}08`, borderRadius: 8,
            border: `1px solid ${C.amber}15`,
          }}>
            All responses are simulated demo content — no AI backend, no live store connection.
          </div>

          {/* Quick Questions */}
          <div className="responsive-grid-2-380" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {quickQuestions.map((q, i) => (
              <button key={i} onClick={() => sendMessage(q)} disabled={loading} className="interactive-hover" style={{
                padding: "10px 12px", background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 8, color: C.textMid, fontSize: 11, textAlign: "left", cursor: "pointer",
                transition: "all 0.15s", fontFamily: "inherit",
              }}>{q}</button>
            ))}
          </div>
        </div>
      )}

      {activeTab === "families" && (
        <div key="families" className="fade-in">
          <Card style={{ marginBottom: 12 }}>
            <AILabel demo>7-Day Family Performance</AILabel>
            <div style={{ fontSize: 13, color: C.textMid, marginBottom: 16 }}>
              Two families driving the gap. One opportunity the team hasn't fully captured.
            </div>
            {FAMILIES.map((f, i) => (
              <div key={i} style={{
                marginBottom: 14, opacity: 0,
                animation: "fadeSlideIn 0.4s ease forwards", animationDelay: `${i * 80}ms`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{f.name}</span>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <AnimatedNumber value={f.vsLY} decimals={1} suffix="%" style={{
                      fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
                      color: f.vsLY > 0 ? C.emerald : C.rose, fontWeight: 700,
                    }} />
                    <span style={{ fontSize: 11, color: C.textMid }}>{f.units}u</span>
                  </div>
                </div>
                <ProgressBar value={Math.abs(f.vsLY)} max={20} color={f.color} />
              </div>
            ))}
          </Card>

          {/* Root Cause */}
          <Card>
            <AILabel demo>Root Cause Analysis</AILabel>
            {[
              { family: "Women's Basics", cause: "Front table removed during last VM reset. 68% of units now below eye level.", fix: "Move 6 units to front table F-3002", impact: "+€70/day", conf: 84 },
              { family: "Denim", cause: "Size curve broken — M/L depleted on floor. Stockroom zones 1005–1008 have replenishment stock.", fix: "Restock from zones H-1005 to H-1008", impact: "+€50/day", conf: 79 },
            ].map((r, i) => (
              <div key={i} style={{
                marginBottom: i === 0 ? 12 : 0, padding: 14,
                background: C.surface, borderRadius: 10, border: `1px solid ${C.border}`,
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.white, marginBottom: 6 }}>{r.family}</div>
                <div style={{ fontSize: 12, color: C.textMid, marginBottom: 8, lineHeight: 1.5 }}>
                  <span style={{ color: C.rose }}>Cause: </span>{r.cause}
                </div>
                <div style={{ fontSize: 12, color: C.textMid, marginBottom: 8 }}>
                  <span style={{ color: C.emerald }}>Fix: </span>{r.fix}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <ConfidencePill score={r.conf} />
                  <ImpactBadge impact={r.impact} />
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {activeTab === "forecast" && (
        <div key="forecast" className="fade-in">
          <Card style={{ marginBottom: 12 }}>
            <AILabel demo>Closing Forecast — Today</AILabel>
            <div className="responsive-grid-2-380" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: C.roseGlow, borderRadius: 10, padding: 16, border: `1px solid ${C.rose}20`, textAlign: "center" }}>
                <div style={{ fontSize: 10, color: C.rose, fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>Do Nothing</div>
                <AnimatedNumber value={-2.9} decimals={1} suffix="%" style={{ fontSize: 32, fontWeight: 800, color: C.rose }} />
                <div style={{ fontSize: 11, color: C.textMid }}>vs last year</div>
              </div>
              <div style={{ background: C.emeraldGlow, borderRadius: 10, padding: 16, border: `1px solid ${C.emerald}20`, textAlign: "center" }}>
                <div style={{ fontSize: 10, color: C.emerald, fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>With Actions</div>
                <AnimatedNumber value={-0.8} decimals={1} suffix="%" style={{ fontSize: 32, fontWeight: 800, color: C.emerald }} />
                <div style={{ fontSize: 11, color: C.textMid }}>vs last year</div>
              </div>
            </div>
            <div style={{ background: C.accentSoft, borderRadius: 8, padding: "12px 16px", border: `1px solid ${C.accent}20` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.white, marginBottom: 4 }}>Forecast Model</div>
              <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.6 }}>
                Based on 7-day trend, conversion data, and pending actions. If all 3 priority actions are completed before 14:00, the store closes within −1% vs LY. The delta to close the full gap is largely in Licensed Collection visibility and Women's Basics recovery.
              </div>
            </div>
            <div style={{ fontSize: 10, color: C.textDim, marginTop: 10, fontStyle: "italic", textAlign: "center" }}>
              Simulated forecast — not based on live data.
            </div>
          </Card>

          <Card>
            <AILabel demo>What happens if we do nothing?</AILabel>
            {[
              { day: "Today", impact: "Close −2.9% vs LY. Licensed Collection leaves €140 on the table.", risk: "High" },
              { day: "This week", impact: "Weekly gap widens. Denim size curve breaks further, driving returns.", risk: "Medium" },
              { day: "Pre-visit", impact: "Visit readiness falls below 70%. Commercial KPIs flagged.", risk: "High" },
            ].map((r, i) => (
              <div key={i} style={{
                padding: "12px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none",
                display: "flex", gap: 12, alignItems: "flex-start",
              }}>
                <div style={{
                  minWidth: 60, fontSize: 11, fontWeight: 700, color: C.text,
                  background: C.surface, borderRadius: 6, padding: "3px 8px", textAlign: "center",
                }}>{r.day}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5 }}>{r.impact}</div>
                </div>
                <Tag color={r.risk === "High" ? C.rose : C.amber}>{r.risk}</Tag>
              </div>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}
