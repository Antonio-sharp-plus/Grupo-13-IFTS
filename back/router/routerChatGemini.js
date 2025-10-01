const express = require("express");
const LlamarChatGeminiController = require("../controller/controllerChatGemini");

const router = express.Router();

router.post("/mensaje", LlamarChatGeminiController);

module.exports = router;
