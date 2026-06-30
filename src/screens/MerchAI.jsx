import { useState } from "react";
import { useTheme } from "../theme/index.js";
import { Card } from "../components/ui/Card.jsx";
import { AILabel } from "../components/ui/AILabel.jsx";
import { Tag } from "../components/ui/Tag.jsx";
import { PageHeader } from "../components/ui/PageHeader.jsx";
import { InfoModal } from "../components/ui/InfoModal.jsx";
import { ConfidencePill } from "../components/ui/ConfidencePill.jsx";
import { LoadingButton } from "../components/ui/LoadingButton.jsx";
import { AnimatedNumber } from "../components/ui/AnimatedNumber.jsx";
import { ProgressBar } from "../components/ui/ProgressBar.jsx";
import { PRODUCT_PHOTOS, PRODUCT_SVG_FALLBACK, collection } from "../data/merchai.js";

// ─── PRODUCT IMAGE ─────────────────────────────────────────────────────────────

function ProductImage({ sku, size = "md" }) {
  const dim = size === "lg" ? 120 : size === "sm" ? 60 : 84;
  const photo = PRODUCT_PHOTOS[sku];

  if (photo) {
    return (
      <div style={{
        width: dim, height: dim + 16,
        borderRadius: 10,
        overflow: "hidden",
        flexShrink: 0,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        background: "#f0ece4",
      }}>
        <img src={photo} alt={sku} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
      </div>
    );
  }

  const cfg = PRODUCT_SVG_FALLBACK[sku];
  if (!cfg) return null;
  return (
    <div style={{
      width: dim, height: dim + 16, borderRadius: 10,
      background: cfg.bg, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden", position: "relative", flexShrink: 0,
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
    }}>
      <div style={{ opacity: 0.95 }}>
        <svg width="52" height="58" viewBox="0 0 52 58" fill="none">
          <rect x="9" y="0" width="34" height="6" rx="2" fill="rgba(255,255,255,0.35)"/>
          <path d="M9 6 L22 6 L16 57 L6 57 Z" fill="rgba(255,255,255,0.55)"/>
          <path d="M43 6 L30 6 L36 57 L46 57 Z" fill="rgba(255,255,255,0.55)"/>
          <path d="M22 6 L30 6 L36 57 L16 57 Z" fill="rgba(255,255,255,0.3)"/>
        </svg>
      </div>
      <div style={{
        position: "absolute", bottom: 6, left: 0, right: 0, textAlign: "center",
        fontSize: 7, fontWeight: 700, color: "rgba(255,255,255,0.8)",
        letterSpacing: "0.08em", lineHeight: 1.3, whiteSpace: "pre-line",
      }}>{cfg.label}</div>
    </div>
  );
}

// ─── COLLECTION HERO IMAGE ─────────────────────────────────────────────────────

function CollectionHeroImage({ name, zone, health, rebuilt }) {
  const C = useTheme();
  return (
    <div style={{
      width: "100%",
      height: 200,
      borderRadius: 12,
      position: "relative",
      overflow: "hidden",
      marginBottom: 16,
      boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
      background: C.panel,
      border: `1px solid ${C.border}`,
      display: "flex",
    }}>
      {/* Content — left side */}
      <div style={{ position: "relative", padding: "20px 20px 16px", flex: 1 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: C.accentSoft,
          border: `1px solid ${C.border}`,
          borderRadius: 6, padding: "3px 10px",
          fontSize: 10, fontWeight: 700, color: C.textMid,
          letterSpacing: "0.12em", textTransform: "uppercase",
          marginBottom: 10,
        }}>
          ☀ Urban Summer
        </div>

        <div style={{ fontSize: 28, fontWeight: 900, color: C.white, lineHeight: 1.1, marginBottom: 4 }}>
          {name}
        </div>
        <div style={{ fontSize: 12, color: C.textMid, marginBottom: 14 }}>{zone}</div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: C.surface, borderRadius: 8, padding: "6px 12px",
            border: `1px solid ${C.border}`,
          }}>
            <div style={{
              width: 40, height: 40,
              background: `conic-gradient(${rebuilt ? C.emerald : C.rose} ${health * 3.6}deg, ${C.border} 0deg)`,
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.4s ease",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: C.panel,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 800, color: rebuilt ? C.emerald : C.amber,
                transition: "color 0.4s ease",
              }}>{health}</div>
            </div>
            <div>
              <div style={{ fontSize: 9, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.06em" }}>Collection</div>
              <div style={{ fontSize: 11, color: C.text, fontWeight: 600 }}>Health Score</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            <div style={{
              background: C.roseGlow, border: `1px solid ${C.rose}40`,
              borderRadius: 6, padding: "4px 8px",
              fontSize: 10, color: C.rose, fontWeight: 600,
            }}>⚠ Hero Missing</div>
            <div style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 6, padding: "4px 8px",
              fontSize: 10, color: C.textMid, fontWeight: 600,
            }}>SS26</div>
          </div>
        </div>
      </div>

      {/* Full collection photo — right side */}
      <div style={{ position: "relative", width: 140, flexShrink: 0 }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 60,
          background: `linear-gradient(90deg, ${C.panel} 0%, ${C.panel}CC 50%, transparent)`,
          zIndex: 1,
        }} />
        <img
          src={`${import.meta.env.BASE_URL}collection-urban-summer.png`}
          alt="Urban Summer 2026"
          loading="lazy"
          style={{
            height: "100%", width: "100%",
            objectFit: "cover", objectPosition: "center top",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

// ─── MERCHAI — COMPLETE THE STORY ─────────────────────────────────────────────

export function MerchAI() {
  const C = useTheme();
  const [phase, setPhase] = useState("overview"); // overview | loading | rebuild
  const [rebuilt, setRebuilt] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const healthTarget = rebuilt ? collection.healthAfter : collection.health;

  const handleRebuild = () => {
    setPhase("loading");
    setTimeout(() => {
      setRebuilt(true);
      setPhase("rebuild");
    }, 2200);
  };

  const statusColor = s => s === "ok" ? C.emerald : s === "delayed" ? C.rose : C.amber;
  const statusLabel = s => s === "ok" ? "IN STOCK" : s === "delayed" ? "DELAYED" : "LOW STOCK";

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
      {showInfo && (
        <InfoModal
          onClose={() => setShowInfo(false)}
          icon="🧩"
          title="MerchAI"
          color={C.violet}
          tagline="Collection Intelligence"
          description="MerchAI monitors the health of every collection on your floor. When a hero product is delayed or missing, it doesn't wait for you to notice — it diagnoses the gap and rebuilds the story with what you actually have. (Simulated demo — no live connection.)"
          features={[
            { icon: "🩺", title: "Collection Health Score", desc: "A live health score for each collection, calculated from product availability, visual integrity, and commercial performance." },
            { icon: "⚡", title: "Rebuild Engine", desc: "Hero product stuck in logistics? Selects the best available substitute, explains why it fits the narrative, and tells you where to find it." },
            { icon: "📈", title: "Impact Simulation", desc: "See the before/after health score, estimated daily revenue gain, and visual integrity score — before you move a single piece." },
          ]}
          highlight="A collection without its hero can still tell a great story. MerchAI makes sure the floor never goes dark just because logistics did."
        />
      )}
      <PageHeader
        icon={<svg width="22" height="22" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="8" height="8" rx="1.5" stroke={C.violet} strokeWidth="1.5" fill="none"/><rect x="7" y="7" width="8" height="8" rx="1.5" stroke={C.violet} strokeWidth="1.5" fill={`${C.violet}25`}/></svg>}
        title="MerchAI"
        subtitle="Collection Intelligence"
        tag="HERO DEMO"
        color={C.violet}
        onInfo={() => setShowInfo(true)}
        disclaimer="Simulated demo — all data is deterministic, not live."
      />

      {/* Collection Hero Image */}
      <CollectionHeroImage
        name={collection.name}
        zone={collection.zone}
        health={healthTarget}
        rebuilt={rebuilt}
      />

      {/* Collection Health Progress */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <AILabel demo>Collection Health</AILabel>
            {rebuilt && (
              <span style={{ fontSize: 11, color: C.emerald, fontWeight: 600 }}>↑ +{healthTarget - collection.health}pts after fix</span>
            )}
          </div>
          <AnimatedNumber
            key={healthTarget}
            value={healthTarget}
            noSign
            suffix="%"
            style={{ fontSize: 28, fontWeight: 800, color: rebuilt ? C.emerald : C.rose, transition: "color 0.4s ease" }}
          />
        </div>
        <ProgressBar
          value={healthTarget}
          color={rebuilt ? C.emerald : C.rose}
          animateOnMount={false}
        />

        {/* Risk Banner */}
        <div style={{
          marginTop: 12, background: C.roseGlow, borderRadius: 8, padding: "10px 14px",
          border: `1px solid ${C.rose}20`, display: "flex", alignItems: "flex-start", gap: 10,
        }}>
          <span style={{ color: C.rose, fontSize: 16, flexShrink: 0, marginTop: 1 }}>⚠️</span>
          <div>
            <div style={{ fontSize: 11, color: C.rose, fontWeight: 600, marginBottom: 2, textTransform: "uppercase" }}>Collection Risk</div>
            <div style={{ fontSize: 12, color: C.text }}>{collection.risk}</div>
          </div>
        </div>
      </Card>

      {/* Products */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: C.textMid, marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Collection Products
        </div>
        {collection.products.map((p, i) => (
          <Card key={i} style={{
            marginBottom: 8, borderLeft: `4px solid ${statusColor(p.status)}`, opacity: 0,
            animation: "fadeSlideIn 0.4s ease forwards", animationDelay: `${i * 80}ms`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <ProductImage sku={p.sku} size="sm" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3 }}>
                  {p.role === "HERO" && <Tag color={C.rose}>HERO</Tag>}
                  <span style={{ fontSize: 13, fontWeight: p.role === "HERO" ? 700 : 500, color: C.white }}>{p.name}</span>
                </div>
                <div style={{ fontSize: 11, color: C.textMid, fontFamily: "'JetBrains Mono', monospace" }}>{p.sku}</div>
                {p.reason && <div style={{ fontSize: 11, color: C.rose, marginTop: 3 }}>{p.reason}</div>}
              </div>
              <Tag color={statusColor(p.status)}>{statusLabel(p.status)}</Tag>
            </div>
          </Card>
        ))}
      </div>

      {phase !== "rebuild" && (
        <LoadingButton loading={phase === "loading"} loadingLabel="Rebuilding..." onClick={handleRebuild} style={{
          width: "100%", padding: "16px",
          background: C.panel,
          border: `1px solid ${C.border}`, borderRadius: 10, color: C.violet,
          fontSize: 14, fontWeight: 600,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          transition: "border-color 0.2s ease",
        }}>
          <span className="sparkle">✦</span> Rebuild Collection (Demo)
        </LoadingButton>
      )}

      {phase === "loading" && (
        <Card className="fade-in">
          <AILabel demo>MerchAI is rebuilding</AILabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 4 }}>
            {[
              { label: "Scanning collection inventory…", done: true },
              { label: "Evaluating visual coherence…", done: true },
              { label: "Matching substitute products…", done: false },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, opacity: 0, animation: "fadeSlideIn 0.4s ease forwards", animationDelay: `${i * 400}ms` }}>
                <div style={{
                  width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                  background: step.done ? C.emeraldGlow : C.accentSoft,
                  border: `1px solid ${step.done ? C.emerald : C.accent}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10,
                }}>
                  {step.done
                    ? <span style={{ color: C.emerald }}>✓</span>
                    : <div className="thinking-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: C.accent }} />
                  }
                </div>
                <span style={{
                  fontSize: 12, color: step.done ? C.text : C.accent,
                  fontWeight: step.done ? 400 : 600,
                }}>{step.label}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{
              height: 3, background: C.border, borderRadius: 99, overflow: "hidden",
            }}>
              <div style={{
                height: "100%", width: "70%",
                background: `linear-gradient(90deg, ${C.violet}80, ${C.violet})`,
                borderRadius: 99, animation: "rebuildProgress 2.2s ease forwards",
              }} />
            </div>
          </div>
        </Card>
      )}

      {/* Rebuild */}
      {phase === "rebuild" && (
        <div className="fade-in">
          {/* Replacement link — missing item → replacement item */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: C.textMid, marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Product Replacement
            </div>

            {/* Missing hero */}
            <div style={{
              background: C.panel, border: `1px solid ${C.rose}40`, borderRadius: 10,
              padding: "12px 16px", display: "flex", alignItems: "center", gap: 14,
              opacity: 0.75,
            }}>
              <ProductImage sku="PB-5530" size="sm" />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3 }}>
                  <Tag color={C.rose}>HERO</Tag>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.white }}>Linen Cargo Trousers</span>
                </div>
                <div style={{ fontSize: 11, color: C.textMid, fontFamily: "'JetBrains Mono', monospace" }}>PB-5530</div>
              </div>
              <Tag color={C.rose}>DELAYED</Tag>
            </div>

            {/* Connector line */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "4px 0", gap: 12 }}>
              <div style={{ flex: 1, height: 1, background: `repeating-linear-gradient(90deg, ${C.violet}50 0px, ${C.violet}50 6px, transparent 6px, transparent 12px)` }} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: C.violet,
                  background: `${C.violet}12`, border: `1px solid ${C.violet}30`,
                  borderRadius: 20, padding: "4px 14px", letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}>replaced by</span>
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M7 10 L0 0 L14 0 Z" fill={`${C.violet}80`}/>
                </svg>
              </div>
              <div style={{ flex: 1, height: 1, background: `repeating-linear-gradient(90deg, ${C.violet}50 0px, ${C.violet}50 6px, transparent 6px, transparent 12px)` }} />
            </div>

            {/* Replacement */}
            <div style={{
              background: C.panel, border: `1px solid ${C.emerald}50`, borderRadius: 10,
              padding: "12px 16px", display: "flex", alignItems: "center", gap: 14,
              boxShadow: `0 0 0 1px ${C.emerald}15, 0 4px 16px rgba(0,0,0,0.3)`,
            }}>
              <ProductImage sku={collection.replacement.sku} size="sm" />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3 }}>
                  <Tag color={C.emerald}>HERO SUBSTITUTE</Tag>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 2 }}>{collection.replacement.name}</div>
                <div style={{ fontSize: 11, color: C.textMid, fontFamily: "'JetBrains Mono', monospace" }}>{collection.replacement.sku}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                <ConfidencePill score={collection.replacement.match} size="md" />
                <div style={{ fontSize: 10, color: C.emerald }}>{collection.replacement.stock} units ready</div>
              </div>
            </div>
          </div>

          <Card style={{ marginBottom: 16 }}>
            <div className="responsive-grid-2-380" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
              <div style={{ background: C.surface, borderRadius: 7, padding: "8px 12px" }}>
                <div style={{ fontSize: 10, color: C.textMid }}>Stockroom Zone</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.accent, fontFamily: "'JetBrains Mono', monospace" }}>{collection.replacement.zone}</div>
              </div>
              <div style={{ background: C.surface, borderRadius: 7, padding: "8px 12px" }}>
                <div style={{ fontSize: 10, color: C.textMid }}>Units Available</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.emerald }}>{collection.replacement.stock} units</div>
              </div>
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
              <div style={{ fontSize: 10, color: C.textMid, marginBottom: 8, fontWeight: 600, textTransform: "uppercase" }}>Why this holds the story</div>
              {collection.replacement.reasons.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                  <span style={{ color: C.emerald, fontSize: 11, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 12, color: C.textMid }}>{r}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10, color: C.textDim, marginTop: 12, fontStyle: "italic", borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
              Simulated analysis — all product data and recommendations are deterministic demo data.
            </div>
          </Card>

          {/* Before/After */}
          <div key={rebuilt ? "after" : "before"}>
            <Card>
              <AILabel demo>Collection Health Impact</AILabel>
              <div className="responsive-before-after" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "center", marginBottom: 16 }}>
              <div style={{ background: C.roseGlow, borderRadius: 10, padding: "16px", textAlign: "center", border: `1px solid ${C.rose}20` }}>
                <div style={{ fontSize: 10, color: C.rose, fontWeight: 600, marginBottom: 6, textTransform: "uppercase" }}>Before</div>
                <AnimatedNumber value={collection.health} noSign suffix="%" style={{ fontSize: 36, fontWeight: 800, color: C.rose }} />
                <div style={{ fontSize: 11, color: C.textMid }}>Hero missing</div>
              </div>
              <div style={{ textAlign: "center", color: C.emerald, fontSize: 20, fontWeight: 700 }}>→</div>
              <div style={{ background: C.emeraldGlow, borderRadius: 10, padding: "16px", textAlign: "center", border: `1px solid ${C.emerald}20` }}>
                <div style={{ fontSize: 10, color: C.emerald, fontWeight: 600, marginBottom: 6, textTransform: "uppercase" }}>After</div>
                <AnimatedNumber value={collection.healthAfter} noSign suffix="%" style={{ fontSize: 36, fontWeight: 800, color: C.emerald }} />
                <div style={{ fontSize: 11, color: C.textMid }}>Story restored</div>
              </div>
              </div>
              <div className="responsive-grid-2-380" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "Visual Integrity", before: 55, after: 90, color: C.emerald },
                { label: "Cross-Sell Rate", before: 42, after: 71, color: C.accent },
                { label: "Commercial Strength", before: 68, after: 89, color: C.violet },
                { label: "Estimated Daily Gain", before: null, after: "+€85", color: C.emerald, text: true },
              ].map((m, i) => (
                <div key={i} style={{ background: C.surface, borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 10, color: C.textMid, marginBottom: 6, textTransform: "uppercase" }}>{m.label}</div>
                  {m.text ? (
                    <div style={{
                      fontSize: 28, fontWeight: 800, color: m.color,
                      background: `linear-gradient(90deg, ${C.emeraldGlow}, transparent)`,
                      borderRadius: 6, padding: "4px 0",
                    }}>
                      <span style={{ fontSize: 18, opacity: 0.7 }}>€</span>
                      <span>+85</span>
                    </div>
                  ) : (
                    <>
                      <div style={{ position: "relative" }}>
                        <div style={{ position: "absolute", inset: 0, borderRadius: 99 }}>
                          <ProgressBar value={m.before} color="rgba(255,255,255,0.08)" thin animateOnMount={false} />
                        </div>
                        <ProgressBar value={m.after} color={m.color} thin />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                        <span style={{ fontSize: 10, color: C.rose }}>{m.before}%</span>
                        <span style={{ fontSize: 10, color: m.color, fontWeight: 600 }}>{m.after}%</span>
                      </div>
                    </>
                  )}
                </div>
              ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
