const { GoogleGenAI } = require("@google/genai");

const API_KEY = process.env.GOOGLE_API_KEY;
const DEFAULT_MODEL = process.env.GOOGLE_MODEL || "gemini-2.5-flash-lite";

if (!API_KEY) {
  throw new Error("Falta GOOGLE_API_KEY en las variables de entorno");
}

const GeminiAI = new GoogleGenAI({ apiKey: API_KEY });

async function LlamarChatGemini(mensaje, model = DEFAULT_MODEL) {
  const response = await GeminiAI.models.generateContent({
    model,
    contents: mensaje,
  });

  return response.text || "";
}

module.exports = { LlamarChatGemini };
