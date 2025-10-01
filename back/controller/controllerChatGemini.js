const { LlamarChatGeminiService } = require("../service/servicioChatGemini");

async function LlamarChatGeminiController(req, res) {
  try {
    const { message } = req.body;
    console.log("Mensaje recibido:", message);

    const result = await LlamarChatGeminiService(message);
    res.json(result);
  } catch (error) {
    console.error("Error en controller:", error);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
}

module.exports = LlamarChatGeminiController;

