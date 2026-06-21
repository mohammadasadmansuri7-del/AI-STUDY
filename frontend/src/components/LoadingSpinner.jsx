export default function LoadingSpinner({ message = "Generating your study notes..." }) {
  return (
    <div
      id="loading-spinner"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        gap: 24,
      }}
    >
      {/* Animated Spinner */}
      <div style={{ position: "relative" }}>
        <div className="spinner" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
          }}
        >
          📚
        </div>
      </div>

      {/* Message */}
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontWeight: 600,
            color: "#e2e8f0",
            fontSize: "1.1rem",
            marginBottom: 8,
          }}
        >
          {message}
        </p>
        <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
          This may take 15–30 seconds depending on content length
        </p>
      </div>

      {/* Animated dots */}
      <div style={{ display: "flex", gap: 6 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#6366f1",
              animation: `pulse-dot 1.4s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
