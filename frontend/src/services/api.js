import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 120000, // 2 minutes for AI generation
});

/**
 * Generate study notes from a topic
 */
export async function generateFromTopic(topic) {
  const response = await API.post("/generate/topic", { topic });
  return response.data;
}

/**
 * Generate study notes from an uploaded file
 */
export async function generateFromFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await API.post("/generate/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export default API;
