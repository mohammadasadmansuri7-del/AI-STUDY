import { HiOutlineAcademicCap } from "react-icons/hi";

export default function Footer() {
  return (
    <footer
      id="main-footer"
      style={{
        borderTop: "1px solid rgba(99, 102, 241, 0.1)",
        background: "rgba(10, 14, 26, 0.6)",
        padding: "32px 24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <HiOutlineAcademicCap size={20} color="#6366f1" />
          <span
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#94a3b8",
            }}
          >
            StudyNotes AI
          </span>
        </div>
        <p style={{ fontSize: "0.8rem", color: "#475569" }}>
          Powered by Google Gemini · Built for students · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
