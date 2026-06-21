import { Link } from "react-router-dom";
import {
  HiOutlineDocumentText,
  HiOutlineLightBulb,
  HiOutlineClipboardList,
  HiOutlineAcademicCap,
  HiOutlineUpload,
  HiOutlineSparkles,
  HiOutlineClock,
  HiOutlineShieldCheck,
} from "react-icons/hi";

const features = [
  {
    icon: <HiOutlineDocumentText size={28} />,
    title: "Detailed Notes",
    description: "Comprehensive, well-structured notes that cover every important aspect of your topic.",
    color: "#6366f1",
  },
  {
    icon: <HiOutlineLightBulb size={28} />,
    title: "Smart Summary",
    description: "Concise summaries that capture the essence of complex topics in easy-to-digest format.",
    color: "#8b5cf6",
  },
  {
    icon: <HiOutlineClipboardList size={28} />,
    title: "Key Points",
    description: "Essential points highlighted and organized for quick revision before exams.",
    color: "#06b6d4",
  },
  {
    icon: <HiOutlineAcademicCap size={28} />,
    title: "MCQ Practice",
    description: "10 interactive multiple-choice questions with answers to test your understanding.",
    color: "#10b981",
  },
];

const benefits = [
  {
    icon: <HiOutlineUpload size={22} />,
    title: "Multiple Input Formats",
    description: "Upload PDF, DOCX, TXT, or images — or just type a topic.",
  },
  {
    icon: <HiOutlineSparkles size={22} />,
    title: "AI-Powered",
    description: "Powered by Google Gemini for accurate, intelligent content generation.",
  },
  {
    icon: <HiOutlineClock size={22} />,
    title: "Save Time",
    description: "Generate complete study material in under 30 seconds.",
  },
  {
    icon: <HiOutlineShieldCheck size={22} />,
    title: "Student-Friendly",
    description: "Content written in simple, easy-to-understand language.",
  },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Background Orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />

      {/* Hero Section */}
      <section
        id="hero-section"
        style={{
          paddingTop: 140,
          paddingBottom: 80,
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}
          className="fade-in"
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 18px",
              borderRadius: 50,
              background: "rgba(99, 102, 241, 0.1)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              marginBottom: 24,
            }}
          >
            <HiOutlineSparkles size={14} color="#818cf8" />
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#818cf8",
              }}
            >
              Powered by Google Gemini AI
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: 20,
              letterSpacing: "-0.03em",
            }}
          >
            Generate{" "}
            <span className="gradient-text">Study Notes</span>
            <br />
            in Seconds with AI
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "#94a3b8",
              lineHeight: 1.7,
              maxWidth: 580,
              margin: "0 auto 36px",
            }}
          >
            Transform any topic or document into detailed notes, summaries,
            key points, and practice MCQs — all powered by artificial intelligence.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Link to="/generate" style={{ textDecoration: "none" }}>
              <button
                id="cta-generate-notes"
                className="btn-gradient"
                style={{ fontSize: "1.05rem", padding: "14px 36px" }}
              >
                ✨ Generate Notes
              </button>
            </Link>
            <a href="#features" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "14px 36px",
                  borderRadius: 12,
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  background: "rgba(99, 102, 241, 0.08)",
                  border: "1px solid rgba(99, 102, 241, 0.2)",
                  color: "#a5b4fc",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              >
                Learn More
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        style={{
          padding: "60px 24px 80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 800,
                marginBottom: 12,
                letterSpacing: "-0.02em",
              }}
            >
              Everything You Need to{" "}
              <span className="gradient-text">Study Smarter</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: "1rem", maxWidth: 500, margin: "0 auto" }}>
              AI-generated study material tailored to your needs
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            {features.map((feature, i) => (
              <div
                key={i}
                className={`glass-card fade-in fade-in-delay-${i + 1}`}
                style={{ padding: "28px 24px", cursor: "default" }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: `${feature.color}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: feature.color,
                    marginBottom: 16,
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "#e2e8f0",
                    marginBottom: 8,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "#64748b",
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits-section"
        style={{
          padding: "60px 24px 80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 800,
                marginBottom: 12,
              }}
            >
              Why <span className="gradient-text">StudyNotes AI</span>?
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {benefits.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "20px",
                  borderRadius: 14,
                  background: "rgba(17, 24, 39, 0.4)",
                  border: "1px solid rgba(99, 102, 241, 0.08)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  transition: "all 0.3s",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(99, 102, 241, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#818cf8",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h4
                    style={{
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: "#e2e8f0",
                      marginBottom: 4,
                    }}
                  >
                    {item.title}
                  </h4>
                  <p style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "60px 24px 100px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="glass-card pulse-glow"
          style={{
            maxWidth: 650,
            margin: "0 auto",
            padding: "48px 36px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
              fontWeight: 800,
              marginBottom: 12,
            }}
          >
            Ready to{" "}
            <span className="gradient-text">supercharge</span> your studies?
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "0.95rem",
              marginBottom: 24,
            }}
          >
            Start generating AI-powered study notes right now — it's fast and free.
          </p>
          <Link to="/generate" style={{ textDecoration: "none" }}>
            <button className="btn-gradient" style={{ fontSize: "1rem", padding: "14px 40px" }}>
              🚀 Get Started
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
