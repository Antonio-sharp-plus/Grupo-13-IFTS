const express = require('express');
const router = express.Router();
const controllerChatbot = require('../controller/controllerChatbot');

router.get('/:prompt', controllerChatbot.LlamarChatbotController);

module.exports = router;