import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlinePencilAlt, HiOutlineUpload } from "react-icons/hi";
import FileUploader from "../components/FileUploader";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { generateFromTopic, generateFromFile } from "../services/api";

export default function GeneratorPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("topic");
  const [topic, setTopic] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleGenerate = async () => {
    setError("");

    if (activeTab === "topic") {
      if (!topic.trim()) {
        setError("Please enter a topic to generate notes.");
        return;
      }
      if (topic.trim().length < 2) {
        setError("Topic must be at least 2 characters long.");
        return;
      }
    } else {
      if (!file) {
        setError("Please upload a file to generate notes.");
        return;
      }
    }

    let active = true;
    setLoading(true);

    try {
      let result;
      if (activeTab === "topic") {
        result = await generateFromTopic(topic.trim());
      } else {
        result = await generateFromFile(file);
      }

      if (result.success) {
        active = false;
        navigate("/results", {
          state: {
            data: result.data,
            source: result.source,
            input: result.input,
          },
        });
      } else {
        setError(result.error || "Failed to generate notes. Please try again.");
      }
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please check your connection and try again.";
      setError(message);
    } finally {
      if (active) {
        setLoading(false);
        setCooldown(5); // 5-second cooldown
      }
    }
  };

  if (loading) {
    return (
      <div style={{ paddingTop: 100, minHeight: "100vh" }}>
        <LoadingSpinner
          message={
            activeTab === "topic"
              ? `Generating notes for "${topic.trim()}"...`
              : `Processing "${file?.name}" and generating notes...`
          }
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", paddingTop: 100 }}>
      {/* Background Orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />

      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "0 24px 80px",
          position: "relative",
          zIndex: 1,
        }}
        className="fade-in"
      >
        {/* Page Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h1
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 800,
              marginBottom: 10,
              letterSpacing: "-0.02em",
            }}
          >
            Generate{" "}
            <span className="gradient-text">Study Notes</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: "1rem" }}>
            Enter a topic or upload your study material
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            padding: 4,
            background: "rgba(17, 24, 39, 0.5)",
            borderRadius: 12,
            border: "1px solid rgba(99, 102, 241, 0.1)",
            marginBottom: 28,
          }}
        >
          <button
            id="tab-topic"
            onClick={() => setActiveTab("topic")}
            className={`tab-btn ${activeTab === "topic" ? "active" : ""}`}
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            <HiOutlinePencilAlt size={18} />
            Enter Topic
          </button>
          <button
            id="tab-upload"
            onClick={() => setActiveTab("upload")}
            className={`tab-btn ${activeTab === "upload" ? "active" : ""}`}
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            <HiOutlineUpload size={18} />
            Upload File
          </button>
        </div>

        {/* Content Area */}
        <div className="glass-card" style={{ padding: "28px" }}>
          {activeTab === "topic" ? (
            /* Topic Input */
            <div>
              <label
                htmlFor="topic-input"
                style={{
                  display: "block",
                  fontWeight: 600,
                  color: "#e2e8f0",
                  marginBottom: 10,
                  fontSize: "0.95rem",
                }}
              >
                What would you like to study?
              </label>
              <textarea
                id="topic-input"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Photosynthesis, Newton's Laws of Motion, World War II, Machine Learning..."
                rows={4}
                maxLength={500}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: "1px solid rgba(99, 102, 241, 0.2)",
                  background: "rgba(17, 24, 39, 0.5)",
                  color: "#e2e8f0",
                  fontSize: "0.95rem",
                  fontFamily: "inherit",
                  resize: "vertical",
                  outline: "none",
                  transition: "border-color 0.3s",
                  lineHeight: 1.6,
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(99, 102, 241, 0.4)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(99, 102, 241, 0.2)")
                }
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 6,
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color:
                      topic.length > 450 ? "#f43f5e" : "#475569",
                  }}
                >
                  {topic.length}/500
                </span>
              </div>
            </div>
          ) : (
            /* File Upload */
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 600,
                  color: "#e2e8f0",
                  marginBottom: 10,
                  fontSize: "0.95rem",
                }}
              >
                Upload your study material
              </label>
              <FileUploader onFileSelect={setFile} disabled={loading} />
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ marginTop: 20 }}>
              <ErrorMessage
                message={error}
                onRetry={() => setError("")}
              />
            </div>
          )}

          {/* Generate Button */}
          <button
            id="generate-button"
            onClick={handleGenerate}
            disabled={loading || cooldown > 0}
            className="btn-gradient"
            style={{
              width: "100%",
              marginTop: 24,
              padding: "14px",
              fontSize: "1.05rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              opacity: (loading || cooldown > 0) ? 0.6 : 1,
              cursor: (loading || cooldown > 0) ? "not-allowed" : "pointer"
            }}
          >
            {loading ? (
              "⏳ Processing..."
            ) : cooldown > 0 ? (
              `⏳ Cooldown: Wait ${cooldown}s`
            ) : (
              "✨ Generate Study Notes"
            )}
          </button>
        </div>

        {/* Supported Formats Info */}
        <div
          style={{
            marginTop: 28,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              color: "#475569",
              marginBottom: 10,
            }}
          >
            Supported formats
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "PDF", emoji: "📄" },
              { label: "DOCX", emoji: "📝" },
              { label: "TXT", emoji: "📃" },
              { label: "PNG", emoji: "🖼️" },
              { label: "JPG", emoji: "🖼️" },
              { label: "Topic", emoji: "💬" },
            ].map((fmt) => (
              <span
                key={fmt.label}
                style={{
                  fontSize: "0.75rem",
                  padding: "5px 12px",
                  borderRadius: 8,
                  background: "rgba(17, 24, 39, 0.5)",
                  border: "1px solid rgba(99, 102, 241, 0.08)",
                  color: "#64748b",
                  fontWeight: 500,
                }}
              >
                {fmt.emoji} {fmt.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
