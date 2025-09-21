const servicioChatBot = require("../service/servicioChatBot");

async function LlamarChatbotController(req, res) {
    try {
        const mensaje = req.params.mensaje;
        const datos = await servicioChatBot.LlamarChatBotService(mensaje);
        return datos;
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    LlamarChatbotController
}