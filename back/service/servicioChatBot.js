const repositorioChatbot = require ("../repositorio/repositorioChatbot");

async function LlamarChatBotService(prompt){
    try
    {
        let respuesta = await repositorioChatbot.LlamarChatBot(prompt);
        return respuesta;
    }
    catch (error) {
        console.error("Error al llamar al chatbot:", error);
        throw error;
    }
    
}

module.exports = {
    LlamarChatBotService
}