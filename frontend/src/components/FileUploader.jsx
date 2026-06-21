import { useRef, useState } from "react";
import {
  HiOutlineCloudUpload,
  HiOutlineX,
} from "react-icons/hi";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/png",
  "image/jpeg",
  "image/jpg",
];

const FILE_LABELS = {
  "application/pdf": { label: "PDF", color: "#f43f5e", icon: "📄" },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    label: "DOCX",
    color: "#3b82f6",
    icon: "📝",
  },
  "text/plain": { label: "TXT", color: "#10b981", icon: "📃" },
  "image/png": { label: "PNG", color: "#f59e0b", icon: "🖼️" },
  "image/jpeg": { label: "JPG", color: "#f59e0b", icon: "🖼️" },
  "image/jpg": { label: "JPG", color: "#f59e0b", icon: "🖼️" },
};

const MAX_SIZE_MB = 10;

export default function FileUploader({ onFileSelect, disabled }) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  function validateFile(file) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Invalid file type. Please upload PDF, DOCX, TXT, PNG, or JPG.";
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File too large. Maximum size is ${MAX_SIZE_MB}MB.`;
    }
    return null;
  }

  function handleFile(file) {
    setError("");
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      onFileSelect(null);
      return;
    }
    setSelectedFile(file);
    onFileSelect(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) handleFile(file);
  }

  function removeFile() {
    setSelectedFile(null);
    setError("");
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div>
      {/* Drop Zone */}
      <div
        id="file-drop-zone"
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        style={{
          border: `2px dashed ${
            dragOver
              ? "#6366f1"
              : error
              ? "#f43f5e"
              : "rgba(99, 102, 241, 0.2)"
          }`,
          borderRadius: 16,
          padding: selectedFile ? "24px" : "48px 24px",
          textAlign: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "all 0.3s",
          background: dragOver
            ? "rgba(99, 102, 241, 0.08)"
            : "rgba(17, 24, 39, 0.4)",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
          onChange={handleChange}
          style={{ display: "none" }}
          disabled={disabled}
        />

        {selectedFile ? (
          /* File Preview */
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${FILE_LABELS[selectedFile.type]?.color}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                }}
              >
                {FILE_LABELS[selectedFile.type]?.icon || "📎"}
              </div>
              <div style={{ textAlign: "left" }}>
                <p
                  style={{
                    fontWeight: 600,
                    color: "#e2e8f0",
                    fontSize: "0.95rem",
                    marginBottom: 2,
                  }}
                >
                  {selectedFile.name}
                </p>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "2px 8px",
                      borderRadius: 6,
                      background: `${FILE_LABELS[selectedFile.type]?.color}22`,
                      color: FILE_LABELS[selectedFile.type]?.color,
                      fontWeight: 600,
                    }}
                  >
                    {FILE_LABELS[selectedFile.type]?.label}
                  </span>
                  <span
                    style={{ fontSize: "0.8rem", color: "#64748b" }}
                  >
                    {formatSize(selectedFile.size)}
                  </span>
                </div>
              </div>
            </div>
            {!disabled && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                style={{
                  background: "rgba(244, 63, 94, 0.15)",
                  border: "none",
                  borderRadius: 8,
                  padding: 8,
                  cursor: "pointer",
                  color: "#f43f5e",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <HiOutlineX size={18} />
              </button>
            )}
          </div>
        ) : (
          /* Upload Prompt */
          <>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(99, 102, 241, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <HiOutlineCloudUpload size={28} color="#6366f1" />
            </div>
            <p
              style={{
                fontWeight: 600,
                color: "#e2e8f0",
                marginBottom: 4,
                fontSize: "1rem",
              }}
            >
              Drop your file here or{" "}
              <span style={{ color: "#818cf8" }}>browse</span>
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#64748b",
                marginBottom: 16,
              }}
            >
              PDF, DOCX, TXT, PNG, JPG — Max {MAX_SIZE_MB}MB
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {["PDF", "DOCX", "TXT", "PNG", "JPG"].map((fmt) => (
                <span
                  key={fmt}
                  style={{
                    fontSize: "0.7rem",
                    padding: "4px 10px",
                    borderRadius: 6,
                    background: "rgba(99, 102, 241, 0.1)",
                    color: "#818cf8",
                    fontWeight: 600,
                  }}
                >
                  .{fmt.toLowerCase()}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p
          style={{
            marginTop: 12,
            fontSize: "0.85rem",
            color: "#f43f5e",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}
