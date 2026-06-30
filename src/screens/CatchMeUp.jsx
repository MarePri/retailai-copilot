import { useState } from "react";
import { useTheme } from "../theme/index.js";
import { Card } from "../components/ui/Card.jsx";
import { AILabel } from "../components/ui/AILabel.jsx";
import { PageHeader } from "../components/ui/PageHeader.jsx";
import { Spinner } from "../components/ui/Spinner.jsx";
import { LoadingButton } from "../components/ui/LoadingButton.jsx";

export function CatchMeUp() {
  const C = useTheme();
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [aiText, setAiText] = useState("");
  const [days, setDays] = useState(7);

  const handleGenerate = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 900));
    setAiText(`**What happened (last ${days} days):**\n\n• Store tracked −3.8% vs LY overall — gap driven by Women's Basics (−11%) and Denim (−8%)\n• Licensed Collection broke out: +14% — highest performing family this week\n• Urban Summer collection arrived Tuesday — hero linen trouser delayed, currently substituted\n• Delivery Thursday 08:00 brought full Accessories restock — B3/B4 processed, floor updated\n• Team completed VM reset on Men's zone — outerwear visibility improved, +3% this week\n\n**What needs action today:**\n1. Women's Basics front table — move 6 units to F-3002 (was deprioritised during reset)\n2. Denim replenishment — H-1005 to H-1008 has stock that hasn't hit floor\n3. Licensed Collection positioning — currently mid-floor, needs prime visibility\n\n**Coming up:**\n• Regional visit in 7 days — Visit Readiness at 68% (needs: commercial, collection, ops)\n• Next delivery Thursday 08:00`);
    setLoading(false);
    setGenerated(true);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
      <PageHeader
        icon="⚡"
        title="Catch Me Up"
        subtitle="Demo briefing for returning managers — everything that matters, in 5 minutes."
        color={C.accent}
        disclaimer="Simulated demo — generated content is deterministic, not AI."
      />

      {!generated ? (
        <Card style={{ marginBottom: 16 }}>
          <AILabel demo>Store Journal</AILabel>
          <div style={{ fontSize: 14, color: C.textMid, marginBottom: 20, lineHeight: 1.6 }}>
            Returning from leave? Choose how long you were away and it will brief you on everything that happened, what matters, and what to do today.
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: C.textMid, marginBottom: 10, fontWeight: 600, textTransform: "uppercase" }}>Days away</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[3, 7, 14, 30].map(d => (
                <button key={d} onClick={() => setDays(d)} className="btn-hover" style={{
                  padding: "8px 16px", borderRadius: 8, border: `1px solid ${days === d ? C.accent : C.border}`,
                  background: days === d ? C.accentSoft : C.surface,
                  color: days === d ? C.accent : C.textMid, fontSize: 13, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.15s",
                }}>{d}d</button>
              ))}
            </div>
          </div>
          <LoadingButton loading={loading} loadingLabel={`Generating ${days}-Day Briefing...`} onClick={handleGenerate} style={{
            width: "100%", padding: 14, background: C.accentSoft, border: `1px solid ${C.accent}40`,
            borderRadius: 10, color: C.accent, fontSize: 14, fontWeight: 600,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <span>✦</span> Generate {days}-Day Briefing
          </LoadingButton>
          {loading && <Spinner />}
        </Card>
      ) : (
        <div className="fade-in">
          <Card glow style={{ marginBottom: 16 }}>
            <AILabel demo>Briefing · Last {days} days</AILabel>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>{aiText}</div>
            <div style={{ fontSize: 10, color: C.textDim, marginTop: 12, fontStyle: "italic", borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
              Generated from deterministic demo data — not a live store system.
            </div>
          </Card>
          <button onClick={() => { setGenerated(false); setAiText(""); }} className="btn-hover" style={{
            padding: "10px 20px", background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: 8, color: C.textMid, fontSize: 13, cursor: "pointer",
            transition: "all 0.15s",
          }}>← Generate new briefing</button>
        </div>
      )}

      {!generated && (
        <div style={{ display: "grid", gap: 10 }}>
          {[
            { icon: "🏝️", label: "Holiday return", desc: "Full briefing after 7+ days away" },
            { icon: "🔄", label: "Manager rotation", desc: "New DM taking over the store" },
            { icon: "📋", label: "DT visit prep", desc: "Regional manager briefing before visit" },
            { icon: "🤒", label: "Sick leave", desc: "Catch up after unexpected absence" },
          ].map((s, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, alignItems: "center",
              background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px",
              opacity: 0, animation: "scaleIn 0.35s ease forwards", animationDelay: `${i * 100}ms`,
            }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.white }}>{s.label}</div>
                <div style={{ fontSize: 11, color: C.textMid }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
