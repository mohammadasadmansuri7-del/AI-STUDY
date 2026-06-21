import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import NotesSection from "../components/NotesSection";
import MCQSection from "../components/MCQSection";
import {
  HiOutlineDocumentText,
  HiOutlineClipboardList,
  HiOutlineLightBulb,
  HiOutlineAcademicCap,
  HiOutlineArrowLeft,
  HiOutlineRefresh,
} from "react-icons/hi";

const tabs = [
  { id: "notes", label: "Detailed Notes", icon: <HiOutlineDocumentText size={16} />, emoji: "📝" },
  { id: "summary", label: "Summary", icon: <HiOutlineClipboardList size={16} />, emoji: "📋" },
  { id: "keypoints", label: "Key Points", icon: <HiOutlineLightBulb size={16} />, emoji: "💡" },
  { id: "concepts", label: "Concepts", icon: <HiOutlineAcademicCap size={16} />, emoji: "🎯" },
  { id: "mcqs", label: "MCQs", icon: <HiOutlineAcademicCap size={16} />, emoji: "🧠" },
];

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("notes");

  const { data, source, input } = location.state || {};

  // Redirect if no data
  if (!data) {
    return (
      <div
        style={{
          minHeight: "100vh",
          paddingTop: 120,
          textAlign: "center",
          padding: "120px 24px 80px",
        }}
      >
        <div className="glass-card" style={{ maxWidth: 500, margin: "0 auto", padding: "48px 32px" }}>
          <p style={{ fontSize: "3rem", marginBottom: 16 }}>📭</p>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#e2e8f0",
              marginBottom: 12,
            }}
          >
            No Notes Found
          </h2>
          <p style={{ color: "#64748b", marginBottom: 24 }}>
            It looks like you haven't generated any notes yet.
          </p>
          <Link to="/generate" style={{ textDecoration: "none" }}>
            <button className="btn-gradient" style={{ padding: "12px 32px" }}>
              Generate Notes
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", paddingTop: 90 }}>
      {/* Background Orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 24px 80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div
          className="fade-in"
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 28,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <button
                onClick={() => navigate("/generate")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "6px 12px",
                  borderRadius: 8,
                  background: "rgba(99, 102, 241, 0.1)",
                  border: "1px solid rgba(99, 102, 241, 0.2)",
                  color: "#818cf8",
                  fontWeight: 500,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                <HiOutlineArrowLeft size={14} />
                Back
              </button>
            </div>
            <h1
              style={{
                fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              <span className="gradient-text">Study Notes</span>
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: 4 }}>
              {source === "topic" ? `Topic: "${input}"` : `File: ${input}`}
            </p>
          </div>

          <button
            id="generate-new-btn"
            onClick={() => navigate("/generate")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 10,
              background: "rgba(99, 102, 241, 0.1)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              color: "#a5b4fc",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            <HiOutlineRefresh size={16} />
            Generate New
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          className="fade-in fade-in-delay-1"
          style={{
            display: "flex",
            gap: 6,
            padding: 4,
            background: "rgba(17, 24, 39, 0.5)",
            borderRadius: 12,
            border: "1px solid rgba(99, 102, 241, 0.1)",
            marginBottom: 24,
            overflowX: "auto",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              style={{
                flex: "1 0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                whiteSpace: "nowrap",
                fontSize: "0.85rem",
                padding: "8px 16px",
              }}
            >
              <span style={{ fontSize: "0.9rem" }}>{tab.emoji}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="fade-in fade-in-delay-2">
          {activeTab === "notes" && (
            <NotesSection
              title="Detailed Notes"
              content={data.detailedNotes}
              icon="📝"
              type="markdown"
            />
          )}

          {activeTab === "summary" && (
            <NotesSection
              title="Summary"
              content={data.summary}
              icon="📋"
              type="text"
            />
          )}

          {activeTab === "keypoints" && (
            <NotesSection
              title="Key Points"
              content={data.keyPoints}
              icon="💡"
              type="list"
            />
          )}

          {activeTab === "concepts" && (
            <NotesSection
              title="Important Concepts"
              content={data.importantConcepts}
              icon="🎯"
              type="concepts"
            />
          )}

          {activeTab === "mcqs" && <MCQSection mcqs={data.mcqs} />}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .tab-label { display: none; }
        }
      `}</style>
    </div>
  );
}
