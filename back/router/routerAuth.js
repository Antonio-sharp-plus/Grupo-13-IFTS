const express = require('express');
const router = express.Router();
const controllerUsuario = require('../controller/controllerUsuario');

// Registro
router.post('/registro', controllerUsuario.registrarUsuario);
// Login
router.post('/login', controllerUsuario.loginUsuario);

module.exports = router;