require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const generateRoutes = require("./routes/generate");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// API Routes
app.use("/api/generate", generateRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "AI Study Notes Generator API is running" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      success: false,
      error: "File too large. Maximum size is 10MB.",
    });
  }

  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({
      success: false,
      error: "Unexpected file field. Please use 'file' as the field name.",
    });
  }

  res.status(500).json({
    success: false,
    error: "An unexpected error occurred. Please try again.",
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📚 AI Study Notes Generator API ready`);
});
