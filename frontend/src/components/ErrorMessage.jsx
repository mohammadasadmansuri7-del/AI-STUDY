export default function ErrorMessage({ message, onRetry }) {
  return (
    <div
      id="error-message"
      style={{
        background: "rgba(244, 63, 94, 0.08)",
        border: "1px solid rgba(244, 63, 94, 0.2)",
        borderRadius: 12,
        padding: "20px 24px",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
      }}
    >
      <span
        style={{
          fontSize: "1.3rem",
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        ⚠️
      </span>
      <div style={{ flex: 1 }}>
        <p
          style={{
            color: "#fca5a5",
            fontWeight: 600,
            fontSize: "0.95rem",
            marginBottom: 4,
          }}
        >
          Something went wrong
        </p>
        <p style={{ color: "#f87171", fontSize: "0.85rem", lineHeight: 1.5 }}>
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              marginTop: 12,
              padding: "8px 20px",
              borderRadius: 8,
              background: "rgba(244, 63, 94, 0.15)",
              border: "1px solid rgba(244, 63, 94, 0.3)",
              color: "#fca5a5",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
