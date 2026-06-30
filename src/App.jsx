import { useState } from "react";
import { ThemeContext, darkC, lightC } from "./theme/index.js";
import { Background } from "./components/ui/Background.jsx";
import { CommandCenter } from "./screens/CommandCenter.jsx";
import { StyleAI } from "./screens/StyleAI.jsx";
import { MerchAI } from "./screens/MerchAI.jsx";
import { RetailAI } from "./screens/RetailAI.jsx";
import { CatchMeUp } from "./screens/CatchMeUp.jsx";
import { VisitReadiness } from "./screens/VisitReadiness.jsx";
import { NAV } from "./data/store.js";
import "./styles/app.css";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [isDark, setIsDark] = useState(false);
  const C = isDark ? darkC : lightC;

  const themeStyles = `
    body { background: transparent; color: ${C.text}; }
    ::-webkit-scrollbar-track { background: ${C.surface}; }
    ::-webkit-scrollbar-thumb { background: ${C.border}; }
  `;

  const renderScreen = () => {
    switch (screen) {
      case "home": return <CommandCenter onNav={setScreen} />;
      case "styleai": return <StyleAI />;
      case "merchai": return <MerchAI />;
      case "retailai": return <RetailAI />;
      case "catchmeup": return <CatchMeUp />;
      case "visit": return <VisitReadiness />;
      default: return <CommandCenter onNav={setScreen} />;
    }
  };

  return (
    <ThemeContext.Provider value={C}>
      <style>{themeStyles}</style>
      <Background isDark={isDark} />
      <div style={{ minHeight: "100vh", paddingBottom: "calc(80px + env(safe-area-inset-bottom))", position: "relative", zIndex: 1 }}>
        <div key={screen} className="screen-enter">
          {renderScreen()}
        </div>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setIsDark(d => !d)}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        style={{
          position: "fixed", top: 14, right: 14, zIndex: 200,
          width: 36, height: 36, borderRadius: 10,
          background: C.panel, border: `1px solid ${C.border}`,
          cursor: "pointer", fontSize: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          transition: "background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.3)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)"; }}
      >
        {isDark ? "☀️" : "🌙"}
      </button>

      {/* Bottom Nav */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: `${C.surface}f0`, backdropFilter: "blur(16px)",
        borderTop: `1px solid ${C.border}`,
        padding: "8px 0 max(12px, env(safe-area-inset-bottom))",
        display: "flex", justifyContent: "space-around",
        zIndex: 100,
      }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => setScreen(n.id)} className="responsive-nav-item" style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            background: "none", border: "none", cursor: "pointer",
            padding: "6px 20px", minHeight: 52, minWidth: 64,
            opacity: screen === n.id ? 1 : 0.65,
            transition: "opacity 0.2s, transform 0.2s, background 0.2s",
            transform: screen === n.id ? "scale(1.02)" : "scale(1)",
            borderRadius: 8,
          }}
          onMouseEnter={e => {
            if (screen !== n.id) { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.background = `${C.accent}08`; }
          }}
          onMouseLeave={e => {
            if (screen !== n.id) { e.currentTarget.style.opacity = "0.65"; e.currentTarget.style.background = "none"; }
          }}>
            <span className="responsive-nav-icon" style={{ fontSize: 18, lineHeight: 1 }}>{n.icon}</span>
            <span className="responsive-nav-label" style={{
              fontSize: 10, fontWeight: screen === n.id ? 700 : 400,
              color: screen === n.id ? C.accent : C.textMid, letterSpacing: "0.02em",
            }}>{n.label}</span>
            {screen === n.id && (
              <div style={{ width: 16, height: 2, background: C.accent, borderRadius: 1, marginTop: 1 }} />
            )}
          </button>
        ))}
      </div>
    </ThemeContext.Provider>
  );
}
