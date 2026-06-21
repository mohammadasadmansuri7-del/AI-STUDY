import { useState } from "react";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";

export default function MCQSection({ mcqs }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [score, setScore] = useState(null);

  if (!mcqs || mcqs.length === 0) {
    return (
      <div className="glass-card" style={{ padding: "24px 28px" }}>
        <p style={{ color: "#64748b", textAlign: "center" }}>
          No MCQs generated.
        </p>
      </div>
    );
  }

  const handleSelect = (qIndex, option) => {
    if (revealedAnswers[qIndex]) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleReveal = (qIndex) => {
    setRevealedAnswers((prev) => ({ ...prev, [qIndex]: true }));
  };

  const handleCheckAll = () => {
    const allRevealed = {};
    let correct = 0;
    mcqs.forEach((_, i) => {
      allRevealed[i] = true;
      if (selectedAnswers[i] === mcqs[i].correctAnswer) correct++;
    });
    setRevealedAnswers(allRevealed);
    setScore(correct);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setRevealedAnswers({});
    setScore(null);
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="glass-card" style={{ padding: "24px 28px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "1.3rem" }}>🧠</span>
          <h3
            style={{ fontSize: "1.15rem", fontWeight: 700, color: "#e2e8f0" }}
          >
            Multiple Choice Questions
          </h3>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={handleCheckAll}
            disabled={answeredCount === 0}
            className="btn-gradient"
            style={{
              padding: "8px 18px",
              fontSize: "0.8rem",
              borderRadius: 8,
              opacity: answeredCount === 0 ? 0.4 : 1,
            }}
          >
            Check All ({answeredCount}/{mcqs.length})
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              fontSize: "0.8rem",
              fontWeight: 600,
              background: "rgba(99, 102, 241, 0.1)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              color: "#818cf8",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Score Banner */}
      {score !== null && (
        <div
          style={{
            padding: "16px 20px",
            borderRadius: 12,
            marginBottom: 20,
            background:
              score >= mcqs.length * 0.7
                ? "rgba(16, 185, 129, 0.1)"
                : score >= mcqs.length * 0.4
                ? "rgba(245, 158, 11, 0.1)"
                : "rgba(244, 63, 94, 0.1)",
            border: "1px solid",
            borderColor:
              score >= mcqs.length * 0.7
                ? "rgba(16, 185, 129, 0.3)"
                : score >= mcqs.length * 0.4
                ? "rgba(245, 158, 11, 0.3)"
                : "rgba(244, 63, 94, 0.3)",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#e2e8f0" }}>
            {score}/{mcqs.length}
          </p>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
            {score === mcqs.length
              ? "🎉 Perfect Score!"
              : score >= mcqs.length * 0.7
              ? "👏 Great job!"
              : score >= mcqs.length * 0.4
              ? "📖 Keep studying!"
              : "💪 You'll do better next time!"}
          </p>
        </div>
      )}

      {/* Questions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {mcqs.map((mcq, qIndex) => {
          const isRevealed = revealedAnswers[qIndex];
          const selected = selectedAnswers[qIndex];
          const isCorrect = selected === mcq.correctAnswer;

          return (
            <div
              key={qIndex}
              style={{
                padding: "20px",
                borderRadius: 14,
                background: "rgba(17, 24, 39, 0.5)",
                border: "1px solid",
                borderColor: isRevealed
                  ? isCorrect
                    ? "rgba(16, 185, 129, 0.3)"
                    : "rgba(244, 63, 94, 0.3)"
                  : "rgba(99, 102, 241, 0.08)",
                transition: "all 0.3s",
              }}
            >
              {/* Question */}
              <p
                style={{
                  fontWeight: 600,
                  color: "#e2e8f0",
                  fontSize: "0.95rem",
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 26,
                    height: 26,
                    borderRadius: 7,
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "white",
                    marginRight: 10,
                    verticalAlign: "middle",
                  }}
                >
                  {qIndex + 1}
                </span>
                {mcq.question}
              </p>

              {/* Options */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: 8,
                }}
              >
                {mcq.options.map((option, oIndex) => {
                  const isSelected = selected === option;
                  const isCorrectOption = mcq.correctAnswer === option;
                  let optBg = "rgba(99, 102, 241, 0.05)";
                  let optBorder = "rgba(99, 102, 241, 0.1)";
                  let optColor = "#cbd5e1";

                  if (isRevealed) {
                    if (isCorrectOption) {
                      optBg = "rgba(16, 185, 129, 0.12)";
                      optBorder = "rgba(16, 185, 129, 0.3)";
                      optColor = "#34d399";
                    } else if (isSelected && !isCorrectOption) {
                      optBg = "rgba(244, 63, 94, 0.12)";
                      optBorder = "rgba(244, 63, 94, 0.3)";
                      optColor = "#f87171";
                    }
                  } else if (isSelected) {
                    optBg = "rgba(99, 102, 241, 0.12)";
                    optBorder = "rgba(99, 102, 241, 0.3)";
                    optColor = "#a5b4fc";
                  }

                  return (
                    <button
                      key={oIndex}
                      onClick={() => handleSelect(qIndex, option)}
                      style={{
                        padding: "10px 14px",
                        borderRadius: 10,
                        background: optBg,
                        border: `1px solid ${optBorder}`,
                        color: optColor,
                        fontSize: "0.85rem",
                        textAlign: "left",
                        cursor: isRevealed ? "default" : "pointer",
                        transition: "all 0.2s",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontWeight: isSelected || (isRevealed && isCorrectOption) ? 600 : 400,
                      }}
                    >
                      {isRevealed && isCorrectOption && (
                        <HiOutlineCheck size={14} style={{ flexShrink: 0 }} />
                      )}
                      {isRevealed && isSelected && !isCorrectOption && (
                        <HiOutlineX size={14} style={{ flexShrink: 0 }} />
                      )}
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Reveal / Explanation */}
              <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "flex-start" }}>
                {!isRevealed && selected && (
                  <button
                    onClick={() => handleReveal(qIndex)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 8,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      background: "rgba(99, 102, 241, 0.1)",
                      border: "1px solid rgba(99, 102, 241, 0.2)",
                      color: "#818cf8",
                      cursor: "pointer",
                    }}
                  >
                    Reveal Answer
                  </button>
                )}
                {isRevealed && mcq.explanation && (
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "#94a3b8",
                      fontStyle: "italic",
                      lineHeight: 1.5,
                      padding: "8px 12px",
                      borderRadius: 8,
                      background: "rgba(99, 102, 241, 0.05)",
                      flex: 1,
                    }}
                  >
                    💡 {mcq.explanation}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
