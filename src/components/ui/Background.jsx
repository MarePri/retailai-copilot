export function Background({ isDark }) {
  const stroke = isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.7)";
  const patternOpacity = isDark ? 0.14 : 0.1;
  const grad = isDark
    ? "linear-gradient(150deg, #060B14 0%, #0E1A30 25%, #162440 50%, #0A1828 75%, #050C1A 100%)"
    : "linear-gradient(150deg, #C8B89A 0%, #DDD0B8 20%, #F0E8D5 45%, #E8DDC5 70%, #D5C5A5 100%)";
  const blob1 = isDark ? "rgba(79,142,247,0.22)" : "rgba(160,120,60,0.35)";
  const blob2 = isDark ? "rgba(139,92,246,0.18)" : "rgba(80,140,110,0.22)";
  const blob3 = isDark ? "rgba(16,185,129,0.12)" : "rgba(130,80,180,0.14)";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: grad }}>
      {/* Linen crosshatch */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: patternOpacity }}>
        <defs>
          <pattern id="page-linen" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="8" y2="8" stroke={stroke} strokeWidth="0.5"/>
            <line x1="8" y1="0" x2="0" y2="8" stroke={stroke} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#page-linen)"/>
      </svg>
      {/* Color blobs */}
      <div className="bg-blob bg-blob-1" style={{ position: "absolute", width: 640, height: 640, top: "-12%", left: "-8%", borderRadius: "50%", background: blob1, filter: "blur(90px)" }} />
      <div className="bg-blob bg-blob-2" style={{ position: "absolute", width: 500, height: 500, top: "30%", right: "-8%", borderRadius: "50%", background: blob2, filter: "blur(80px)" }} />
      <div className="bg-blob bg-blob-3" style={{ position: "absolute", width: 380, height: 380, bottom: "5%", left: "20%", borderRadius: "50%", background: blob3, filter: "blur(70px)" }} />
    </div>
  );
}
