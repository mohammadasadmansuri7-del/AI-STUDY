const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

/**
 * Parse PDF buffer and extract text
 */
async function parsePDF(buffer) {
  try {
    const data = await pdfParse(buffer);
    const text = data.text.trim();
    if (!text) {
      throw new Error("No text content found in the PDF.");
    }
    return text;
  } catch (error) {
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
}

/**
 * Parse DOCX buffer and extract text
 */
async function parseDOCX(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value.trim();
    if (!text) {
      throw new Error("No text content found in the DOCX file.");
    }
    return text;
  } catch (error) {
    throw new Error(`Failed to parse DOCX: ${error.message}`);
  }
}

/**
 * Parse TXT buffer and extract text
 */
function parseTXT(buffer) {
  const text = buffer.toString("utf-8").trim();
  if (!text) {
    throw new Error("The text file is empty.");
  }
  return text;
}

/**
 * Check if file is an image type
 */
function isImageFile(mimetype) {
  return ["image/png", "image/jpeg", "image/jpg"].includes(mimetype);
}

/**
 * Unified file parser dispatcher
 */
async function parseFile(file) {
  const { mimetype, buffer } = file;

  if (isImageFile(mimetype)) {
    return { type: "image", buffer, mimetype };
  }

  let text;

  switch (mimetype) {
    case "application/pdf":
      text = await parsePDF(buffer);
      break;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      text = await parseDOCX(buffer);
      break;
    case "text/plain":
      text = parseTXT(buffer);
      break;
    default:
      throw new Error(`Unsupported file type: ${mimetype}`);
  }

  return { type: "text", content: text };
}

module.exports = {
  parsePDF,
  parseDOCX,
  parseTXT,
  isImageFile,
  parseFile,
};
