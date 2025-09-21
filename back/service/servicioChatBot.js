const repositorioChatbot = require ("../repositorio/repositorioChatbot");

async function LlamarChatBotService(mensaje){
    try
    {
        let respuesta = await repositorioChatbot.LlamarChatBot(mensaje);
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