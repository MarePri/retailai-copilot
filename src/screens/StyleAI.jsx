import { useState } from "react";
import { useTheme } from "../theme/index.js";
import { Card } from "../components/ui/Card.jsx";
import { AILabel } from "../components/ui/AILabel.jsx";
import { Tag } from "../components/ui/Tag.jsx";
import { PageHeader } from "../components/ui/PageHeader.jsx";
import { InfoModal } from "../components/ui/InfoModal.jsx";
import { ConfidencePill } from "../components/ui/ConfidencePill.jsx";
import { ImpactBadge } from "../components/ui/ImpactBadge.jsx";
import { Spinner } from "../components/ui/Spinner.jsx";
import { LoadingButton } from "../components/ui/LoadingButton.jsx";
import { alternatives, outfits, upsellItems } from "../data/styleai.js";

export function StyleAI() {
  const C = useTheme();
  const altColor = (a) => ({ emerald: C.emerald, amber: C.amber, rose: C.rose }[a.colorKey] || C.accent);
  const [phase, setPhase] = useState("search"); // search | thinking | result | outfit | upsell
  const [query, setQuery] = useState("White Linen Shirt M");
  const [aiText, setAiText] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("save");
  const [showInfo, setShowInfo] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setPhase("thinking");
    await new Promise(resolve => setTimeout(resolve, 900));
    setAiText(`Ecru Linen Blend Shirt in zone Hanging 1003 is the strongest alternative for "${query}" — 94% similarity to the requested item. Same weave, same summer feel, and it's available in M right now. Two units are on the floor and four more are in the stockroom.`);
    setLoading(false);
    setPhase("result");
  };

  const tabs = [
    { id: "save", label: "Save the Sale" },
    { id: "outfit", label: "Outfit Builder" },
    { id: "upsell", label: "Smart Upsell" },
  ];

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
      {showInfo && (
        <InfoModal
          onClose={() => setShowInfo(false)}
          icon="💡"
          title="StyleAI"
          color={C.accent}
          tagline="Customer Selling Intelligence"
          description="StyleAI is your demo sales companion on the shop floor. When a customer can't find what they're looking for, StyleAI turns a potential lost sale into a conversion — in seconds, not minutes. (Simulated demo — no AI involved.)"
          features={[
            { icon: "🎯", title: "Save the Sale", desc: "Customer wants an out-of-stock item? It matches your live inventory to find the closest alternative and tells you exactly where to find it." },
            { icon: "👗", title: "Outfit Builder", desc: "Generate 3 complete looks built from what's currently in store — tailored to today's trends and your specific customer profile." },
            { icon: "💫", title: "Smart Upsell", desc: "Once you've sold the hero piece, it suggests the 3 best add-ons to increase basket size — all in stock, all trend-relevant." },
          ]}
          highlight="A missed size doesn't have to mean a lost customer. StyleAI gives every floor associate the product knowledge of a veteran stylist."
        />
      )}
      <PageHeader
        icon="💡"
        title="StyleAI"
        subtitle="Customer Selling Intelligence"
        tag="HERO DEMO"
        color={C.accent}
        onInfo={() => setShowInfo(true)}
        disclaimer="Simulated demo — all product matches are pre-defined, not live AI."
      />

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: C.surface, padding: 4, borderRadius: 10, border: `1px solid ${C.border}` }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            flex: 1, padding: "8px 4px", borderRadius: 7, border: "none",
            background: activeTab === t.id ? C.panel : "transparent",
            color: activeTab === t.id ? C.white : C.textMid,
            fontSize: 12, fontWeight: activeTab === t.id ? 600 : 400, cursor: "pointer",
            boxShadow: activeTab === t.id ? "0 1px 4px rgba(0,0,0,0.3)" : "none",
            transition: "all 0.15s",
          }}>{t.label}</button>
        ))}
      </div>

      {activeTab === "save" && (
        <div key="save" className="fade-in">
          {/* Search */}
          <Card style={{ marginBottom: 16 }}>
            <AILabel demo>Save the Sale</AILabel>
            <div style={{ fontSize: 14, color: C.textMid, marginBottom: 14, lineHeight: 1.6 }}>
              Customer asks for a product. It's not available. Finds the best alternative in seconds — simulated demo.
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
                placeholder="e.g. White Linen Shirt M"
                inputMode="text"
                style={{
                  flex: 1, padding: "11px 14px", background: C.surface,
                  border: `1px solid ${C.border}`, borderRadius: 8, color: C.text,
                  fontSize: 16, outline: "none", fontFamily: "inherit",
                }}
              />
              <LoadingButton
                loading={loading}
                loadingLabel="Finding..."
                onClick={handleSearch}
                style={{
                  padding: "11px 18px", minHeight: 44,
                  background: loading ? C.border : C.accent,
                  border: "none", borderRadius: 8, color: C.white,
                  fontSize: 14, fontWeight: 600,
                }}
              >
                Find Alternative
              </LoadingButton>
            </div>
          </Card>

          {/* Thinking */}
          {phase === "thinking" && (
            <Card style={{ marginBottom: 16 }}>
              <AILabel demo>StyleAI is analysing</AILabel>
              <div style={{ fontSize: 13, color: C.textMid, marginBottom: 8 }}>Checking stockroom · Matching trend profile · Calculating similarity…</div>
              <Spinner />
            </Card>
          )}

          {/* AI Reasoning */}
          {(phase === "result" || phase === "outfit") && aiText && (
            <Card glow style={{ marginBottom: 16 }}>
              <AILabel demo>AI Reasoning</AILabel>
              <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, marginBottom: 0 }}>{aiText}</p>
              <div style={{ fontSize: 10, color: C.textDim, marginTop: 12, fontStyle: "italic", borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
                Deterministic demo data — no live inventory or AI service is queried.
              </div>
            </Card>
          )}

          {/* Alternatives */}
          {(phase === "result" || phase === "outfit") && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: C.textMid, marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Best Alternatives
              </div>
              {alternatives.map((alt, i) => (
                <Card key={i} hover style={{
                  marginBottom: 10, borderLeft: `3px solid ${altColor(alt)}`, opacity: 0,
                  animation: "fadeSlideIn 0.4s ease forwards", animationDelay: `${i * 120}ms`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 3 }}>{alt.name}</div>
                      <div style={{ fontSize: 11, color: C.textMid, fontFamily: "'JetBrains Mono', monospace" }}>{alt.sku} · {alt.price}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
                      <ConfidencePill score={alt.similarity} size="md" />
                      {i === 0 && <Tag color={altColor(alt)}>BEST MATCH</Tag>}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                    <span style={{ fontSize: 11, color: C.textMid }}>Available:</span>
                    {alt.sizes.map(s => (
                      <span key={s} style={{
                        padding: "2px 8px", background: C.accentSoft, color: C.accent,
                        borderRadius: 4, fontSize: 11, fontWeight: 600,
                      }}>{s}</span>
                    ))}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
                    <div style={{ background: C.surface, borderRadius: 7, padding: "8px 10px" }}>
                      <div style={{ fontSize: 10, color: C.textMid, marginBottom: 2 }}>Floor</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.white }}>{alt.stock.floor}</div>
                    </div>
                    <div style={{ background: C.surface, borderRadius: 7, padding: "8px 10px" }}>
                      <div style={{ fontSize: 10, color: C.textMid, marginBottom: 2 }}>Stockroom</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.white }}>{alt.stock.stockroom}</div>
                    </div>
                    <div style={{ background: C.surface, borderRadius: 7, padding: "8px 10px" }}>
                      <div style={{ fontSize: 10, color: C.textMid, marginBottom: 2 }}>Zone</div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: C.accent, fontFamily: "'JetBrains Mono', monospace" }}>{alt.stock.zone}</div>
                    </div>
                  </div>

                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10 }}>
                    <div style={{ fontSize: 10, color: C.textMid, marginBottom: 6, fontWeight: 600, textTransform: "uppercase" }}>Why this works</div>
                    {alt.reasons.map((r, j) => (
                      <div key={j} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                        <span style={{ color: altColor(alt), fontSize: 11, marginTop: 1 }}>✓</span>
                        <span style={{ fontSize: 12, color: C.textMid }}>{r}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                    <Tag color={C.accent}>{alt.collection}</Tag>
                    <Tag color={C.violet}>{alt.trend}</Tag>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {phase === "search" && (
            <Card style={{ textAlign: "center", padding: 32 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>💡</div>
              <div style={{ fontSize: 14, color: C.textMid, lineHeight: 1.6 }}>
                Type the product a customer is asking for.<br />It will find the best alternative instantly.
              </div>
              <button onClick={handleSearch} style={{
                marginTop: 16, padding: "10px 24px", background: C.accentSoft,
                border: `1px solid ${C.accent}40`, borderRadius: 8, color: C.accent,
                fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>
                Try with "White Linen Shirt M"
              </button>
            </Card>
          )}
        </div>
      )}

      {activeTab === "outfit" && (
        <div key="outfit" className="fade-in">
          <Card style={{ marginBottom: 16 }}>
            <AILabel demo>AI Outfit Builder</AILabel>
            <div style={{ fontSize: 14, color: C.textMid, marginBottom: 0, lineHeight: 1.6 }}>
              3 complete looks using only what's currently in store. Built for today's customer profile and active trends.
            </div>
          </Card>
          {outfits.map((o, i) => (
            <Card key={i} style={{
              marginBottom: 12, opacity: 0,
              animation: "scaleIn 0.35s ease forwards", animationDelay: `${i * 100}ms`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.white }}>{o.name}</div>
                  <Tag color={C.violet} style={{ marginTop: 4 }}>{o.trend}</Tag>
                </div>
                <ConfidencePill score={o.score} size="md" />
              </div>
              <div style={{ display: "grid", gap: 7, marginBottom: 12 }}>
                {o.items.map((item, j) => (
                  <div key={j} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: C.surface, borderRadius: 7, padding: "8px 12px",
                  }}>
                    <div>
                      <span style={{ fontSize: 10, color: C.textMid, textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.type} · </span>
                      <span style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{item.name}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: C.accent, fontFamily: "'JetBrains Mono', monospace" }}>{item.zone}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: C.white }}>{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: C.accentSoft, borderRadius: 8, padding: "10px 12px", border: `1px solid ${C.accent}20` }}>
                <span style={{ fontSize: 11, color: C.textMid, lineHeight: 1.6 }}>✦ {o.reason}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "upsell" && (
        <div key="upsell" className="fade-in">
          <Card style={{ marginBottom: 16 }}>
            <AILabel demo>Smart Upsell Engine</AILabel>
            <div style={{ fontSize: 14, color: C.textMid, lineHeight: 1.6 }}>
              Based on the Ecru Linen Shirt — here's what to show next. Every suggestion is in stock and trend-relevant.
            </div>
          </Card>
          {upsellItems.map((u, i) => (
            <Card key={i} style={{
              marginBottom: 10, opacity: 0,
              animation: "scaleIn 0.35s ease forwards", animationDelay: `${i * 100}ms`,
            }} hover>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3 }}>
                    <Tag color={C.violet}>{u.cat}</Tag>
                    <span style={{ fontSize: 14, fontWeight: 600, color: C.white }}>{u.name}</span>
                  </div>
                  <div style={{ fontSize: 11, color: C.textMid }}>Zone: <span style={{ color: C.accent, fontFamily: "'JetBrains Mono', monospace" }}>{u.zone}</span></div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <ImpactBadge impact={u.impact} />
                  <ConfidencePill score={u.conf} />
                </div>
              </div>
              <div style={{ fontSize: 12, color: C.textMid, fontStyle: "italic" }}>"{u.reason}"</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
