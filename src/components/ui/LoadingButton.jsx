export function LoadingButton({ loading, onClick, children, loadingLabel, disabled, style }) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      style={{
        position: "relative", overflow: "hidden",
        opacity: loading || disabled ? 0.7 : 1,
        cursor: loading || disabled ? "not-allowed" : "pointer",
        transition: "opacity 0.2s, background 0.2s",
        ...style,
      }}
    >
      {loading ? (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ display: "inline-flex", gap: 4 }}>
            {[0, 1, 2].map(i => (
              <span key={i} className="thinking-dot" style={{
                width: 5, height: 5, borderRadius: "50%", background: "currentColor",
                display: "inline-block", animationDelay: `${i * 0.15}s`,
              }} />
            ))}
          </span>
          {loadingLabel || children}
        </span>
      ) : children}
    </button>
  );
}
