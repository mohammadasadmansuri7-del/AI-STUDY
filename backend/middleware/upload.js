const multer = require("multer");
const path = require("path");

// Allowed file types
const ALLOWED_TYPES = {
  "application/pdf": ".pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
  "text/plain": ".txt",
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Use memory storage — no disk writes
const storage = multer.memoryStorage();

// File filter for validation
const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES[file.mimetype]) {
    cb(null, true);
  } else {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExts = Object.values(ALLOWED_TYPES).join(", ");
    cb(
      new Error(
        `Invalid file type "${ext}". Allowed types: ${allowedExts}`
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

module.exports = upload;
