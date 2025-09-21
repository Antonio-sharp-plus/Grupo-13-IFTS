require('dotenv').config();
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function LlamarChatBot(mensaje){
    const response = await client.responses.create({
        model: "gpt-4o",
        input: mensaje,
    });
    return response.output_text
}

module.exports = {
    LlamarChatBot
}
