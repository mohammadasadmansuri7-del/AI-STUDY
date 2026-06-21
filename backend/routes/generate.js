const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const rateLimiter = require("../middleware/rateLimiter");
const { parseFile } = require("../utils/fileParser");
const {
  generateFromTopic,
  generateFromContent,
  generateFromImage,
} = require("../services/geminiService");

/**
 * POST /api/generate/topic
 * Generate study notes from a topic string
 */
router.post("/topic", rateLimiter, async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid topic.",
      });
    }

    if (topic.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: "Topic must be at least 2 characters long.",
      });
    }

    if (topic.trim().length > 500) {
      return res.status(400).json({
        success: false,
        error: "Topic must be under 500 characters.",
      });
    }

    console.log(`📝 Generating notes for topic: "${topic.trim()}"`);

    const notes = await generateFromTopic(topic.trim());

    res.json({
      success: true,
      data: notes,
      source: "topic",
      input: topic.trim(),
    });
  } catch (error) {
    console.error("Topic generation error:", error);
    const isRateLimit = error.message && error.message.includes("Server is busy");
    const status = isRateLimit ? 429 : 500;
    res.status(status).json({
      success: false,
      message: error.message || "Failed to generate notes. Please try again.",
      error: error.message || "Failed to generate notes. Please try again.",
    });
  }
});

/**
 * POST /api/generate/upload
 * Generate study notes from an uploaded file
 */
router.post("/upload", rateLimiter, (req, res) => {
  upload.single("file")(req, res, async (uploadError) => {
    try {
      // Handle multer errors
      if (uploadError) {
        if (uploadError.code === "LIMIT_FILE_SIZE") {
          return res.status(413).json({
            success: false,
            error: "File too large. Maximum size is 10MB.",
          });
        }
        return res.status(400).json({
          success: false,
          error: uploadError.message || "File upload failed.",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "Please upload a file (PDF, DOCX, TXT, or Image).",
        });
      }

      console.log(
        `📎 Processing file: ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)}KB, ${req.file.mimetype})`
      );

      // Parse the file
      const parsed = await parseFile(req.file);

      let notes;

      if (parsed.type === "image") {
        // Use Gemini Vision for images
        notes = await generateFromImage(parsed.buffer, parsed.mimetype);
      } else {
        // Use text-based generation for documents
        notes = await generateFromContent(parsed.content);
      }

      res.json({
        success: true,
        data: notes,
        source: "file",
        input: req.file.originalname,
      });
    } catch (error) {
      console.error("File generation error:", error);
      const isRateLimit = error.message && error.message.includes("Server is busy");
      const status = isRateLimit ? 429 : 500;
      res.status(status).json({
        success: false,
        message: error.message || "Failed to process file and generate notes.",
        error: error.message || "Failed to process file and generate notes.",
      });
    }
  });
});

module.exports = router;
