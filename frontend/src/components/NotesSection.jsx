import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { HiOutlineClipboardCopy, HiOutlineCheck } from "react-icons/hi";

export default function NotesSection({ title, content, icon, type = "markdown" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const textToCopy =
        type === "list"
          ? content.map((item, i) => `${i + 1}. ${item}`).join("\n")
          : type === "concepts"
          ? content.map((c) => `${c.concept}: ${c.definition}`).join("\n\n")
          : content;

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  return (
    <div
      className="glass-card"
      style={{ padding: "24px 28px", marginBottom: 20 }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "1.3rem" }}>{icon}</span>
          <h3
            style={{
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "#e2e8f0",
            }}
          >
            {title}
          </h3>
        </div>
        <button
          onClick={handleCopy}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            borderRadius: 8,
            background: copied
              ? "rgba(16, 185, 129, 0.15)"
              : "rgba(99, 102, 241, 0.1)",
            border: "1px solid",
            borderColor: copied
              ? "rgba(16, 185, 129, 0.3)"
              : "rgba(99, 102, 241, 0.2)",
            color: copied ? "#34d399" : "#818cf8",
            fontWeight: 500,
            fontSize: "0.8rem",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          {copied ? (
            <>
              <HiOutlineCheck size={14} /> Copied
            </>
          ) : (
            <>
              <HiOutlineClipboardCopy size={14} /> Copy
            </>
          )}
        </button>
      </div>

      {/* Content */}
      {type === "markdown" && (
        <div className="markdown-content">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}

      {type === "text" && (
        <div style={{ lineHeight: 1.8, color: "#cbd5e1", fontSize: "0.95rem" }}>
          {content}
        </div>
      )}

      {type === "list" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {content.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                padding: "12px 16px",
                borderRadius: 10,
                background: "rgba(99, 102, 241, 0.05)",
                border: "1px solid rgba(99, 102, 241, 0.08)",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: 1.6,
                  fontSize: "0.9rem",
                }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      )}

      {type === "concepts" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 14,
          }}
        >
          {content.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "16px 20px",
                borderRadius: 12,
                background: "rgba(99, 102, 241, 0.05)",
                border: "1px solid rgba(99, 102, 241, 0.1)",
                transition: "all 0.3s",
              }}
            >
              <h4
                style={{
                  fontWeight: 700,
                  color: "#a5b4fc",
                  fontSize: "0.95rem",
                  marginBottom: 6,
                }}
              >
                {item.concept}
              </h4>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                }}
              >
                {item.definition}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
