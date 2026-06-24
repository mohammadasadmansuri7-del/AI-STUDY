const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const STUDY_NOTES_PROMPT = `You are an expert educational content creator. Generate comprehensive study material in the following JSON format. The response must be ONLY valid JSON, no markdown code blocks, no extra text.

{
  "detailedNotes": "Write detailed, well-structured notes with clear explanations. Use markdown formatting with headers (##), bullet points, bold text, and numbered lists for clarity. Make it thorough and educational.",
  "summary": "Write a concise but comprehensive summary covering all major points in 3-5 paragraphs.",
  "keyPoints": ["Key point 1", "Key point 2", "Key point 3", "...at least 8-10 key points"],
  "importantConcepts": [
    {"concept": "Concept Name", "definition": "Clear, student-friendly definition and explanation"},
    {"concept": "Concept Name 2", "definition": "Clear, student-friendly definition and explanation"}
  ],
  "mcqs": [
    {
      "question": "Question text?",
      "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
      "correctAnswer": "A) Option 1",
      "explanation": "Brief explanation of why this is correct"
    }
  ]
}

IMPORTANT RULES:
- Generate exactly 10 MCQs
- Each MCQ must have exactly 4 options (A, B, C, D)
- Key points should be at least 8-10 items
- Important concepts should be at least 5-8 items
- All content must be accurate, student-friendly, and easy to understand
- Use simple language suitable for students
- The response must be ONLY the JSON object, nothing else`;

/**
 * Cleanly slice the text to fit within a safe token limit (~15,000 chars or ~3,000 tokens)
 * to avoid exhausting the free tier input token quota.
 */
function sliceText(content, maxLength = 15000) {
  if (!content) return "";
  if (content.length <= maxLength) return content;

  // Try to find a logical sentence or paragraph boundary around the maxLength limit
  const substring = content.substring(0, maxLength);
  const lastPeriod = substring.lastIndexOf(".");
  const lastParagraph = substring.lastIndexOf("\n");
  
  // Choose the boundary that is closer to the end of the substring
  const cutoff = Math.max(lastPeriod, lastParagraph);
  
  // Only slice at boundary if it's reasonably close to the limit (within last 15% of length)
  if (cutoff > maxLength * 0.85) {
    return substring.substring(0, cutoff + 1) + "\n\n[Content truncated to fit within safety limits...]";
  }
  
  return substring + "... [Content truncated to fit within safety limits...]";
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Executes a Gemini API call with exponential backoff retry mechanism for 429 Rate Limits.
 */
async function callGeminiWithRetry(apiCall, maxRetries = 3, initialDelayMs = 2000) {
  let delayMs = initialDelayMs;
  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      const isRateLimit =
        error.status === 429 ||
        error.statusCode === 429 ||
        (error.message &&
          (error.message.includes("429") ||
            error.message.toLowerCase().includes("quota exceeded") ||
            error.message.toLowerCase().includes("resource exhausted") ||
            error.message.toLowerCase().includes("too many requests")));

      if (isRateLimit && attempt <= maxRetries) {
        console.warn(
          `⚠️ Gemini API rate limited (429). Retrying attempt ${attempt}/${maxRetries} after ${delayMs}ms...`
        );
        await delay(delayMs);
        delayMs *= 2; // exponential backoff
      } else {
        throw error;
      }
    }
  }
}

/**
 * Generate study notes from a topic string
 */
async function generateFromTopic(topic) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `${STUDY_NOTES_PROMPT}\n\nGenerate comprehensive study notes for the following topic:\n\n"${topic}"`;

    const result = await callGeminiWithRetry(() => model.generateContent(prompt));
    const response = result.response;
    const text = response.text();

    return parseGeminiResponse(text);
  } catch (error) {
    console.error("Gemini topic generation error:", error);
    const isRateLimit =
      error.status === 429 ||
      error.statusCode === 429 ||
      (error.message &&
        (error.message.includes("429") ||
          error.message.toLowerCase().includes("quota exceeded") ||
          error.message.toLowerCase().includes("resource exhausted") ||
          error.message.toLowerCase().includes("too many requests")));

    if (isRateLimit) {
      throw new Error("Server is busy right now. Please try again after 30 seconds.");
    }
    throw new Error(`Failed to generate notes: ${error.message}`);
  }
}

/**
 * Generate study notes from extracted text content
 */
async function generateFromContent(content) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Optimize Prompt Token Count using sliceText helper
    const truncatedContent = sliceText(content, 15000);

    const prompt = `${STUDY_NOTES_PROMPT}\n\nGenerate comprehensive study notes based on the following content:\n\n"${truncatedContent}"`;

    const result = await callGeminiWithRetry(() => model.generateContent(prompt));
    const response = result.response;
    const text = response.text();

    return parseGeminiResponse(text);
  } catch (error) {
    console.error("Gemini content generation error:", error);
    const isRateLimit =
      error.status === 429 ||
      error.statusCode === 429 ||
      (error.message &&
        (error.message.includes("429") ||
          error.message.toLowerCase().includes("quota exceeded") ||
          error.message.toLowerCase().includes("resource exhausted") ||
          error.message.toLowerCase().includes("too many requests")));

    if (isRateLimit) {
      throw new Error("Server is busy right now. Please try again after 30 seconds.");
    }
    throw new Error(`Failed to generate notes from content: ${error.message}`);
  }
}

/**
 * Generate study notes from an image using Gemini Vision
 */
async function generateFromImage(imageBuffer, mimeType) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const imagePart = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: mimeType,
      },
    };

    const prompt = `${STUDY_NOTES_PROMPT}\n\nAnalyze the content in this image and generate comprehensive study notes based on what you see. If the image contains text, diagrams, equations, or any educational content, use that as the basis for the notes.`;

    const result = await callGeminiWithRetry(() => model.generateContent([prompt, imagePart]));
    const response = result.response;
    const text = response.text();

    return parseGeminiResponse(text);
  } catch (error) {
    console.error("Gemini image generation error:", error);
    const isRateLimit =
      error.status === 429 ||
      error.statusCode === 429 ||
      (error.message &&
        (error.message.includes("429") ||
          error.message.toLowerCase().includes("quota exceeded") ||
          error.message.toLowerCase().includes("resource exhausted") ||
          error.message.toLowerCase().includes("too many requests")));

    if (isRateLimit) {
      throw new Error("Server is busy right now. Please try again after 30 seconds.");
    }
    throw new Error(
      `Failed to generate notes from image: ${error.message}`
    );
  }
}

/**
 * Parse Gemini's JSON response with fallback handling
 */
function parseGeminiResponse(text) {
  try {
    // Remove markdown code block wrappers if present
    let cleanText = text.trim();
    if (cleanText.startsWith("```json")) {
      cleanText = cleanText.slice(7);
    } else if (cleanText.startsWith("```")) {
      cleanText = cleanText.slice(3);
    }
    if (cleanText.endsWith("```")) {
      cleanText = cleanText.slice(0, -3);
    }
    cleanText = cleanText.trim();

    const parsed = JSON.parse(cleanText);

    // Validate structure
    return {
      detailedNotes: parsed.detailedNotes || "No detailed notes generated.",
      summary: parsed.summary || "No summary generated.",
      keyPoints: Array.isArray(parsed.keyPoints)
        ? parsed.keyPoints
        : ["No key points generated."],
      importantConcepts: Array.isArray(parsed.importantConcepts)
        ? parsed.importantConcepts
        : [{ concept: "N/A", definition: "No concepts generated." }],
      mcqs: Array.isArray(parsed.mcqs)
        ? parsed.mcqs
        : [],
    };
  } catch (parseError) {
    console.error("Failed to parse Gemini response:", parseError);
    console.error("Raw response:", text.substring(0, 500));

    // Return a fallback with the raw text as notes
    return {
      detailedNotes: text,
      summary: "The AI response could not be fully parsed. Please see detailed notes above.",
      keyPoints: ["Response parsing encountered an issue — raw content shown in detailed notes."],
      importantConcepts: [
        {
          concept: "Note",
          definition: "The AI generated content but it wasn't in the expected format. The raw content is shown in Detailed Notes.",
        },
      ],
      mcqs: [],
    };
  }
}

module.exports = {
  generateFromTopic,
  generateFromContent,
  generateFromImage,
};
