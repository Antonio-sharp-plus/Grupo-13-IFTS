const express = require('express');
const router = express.Router();
const Usuario = require('../controller/mongoDB/usuarios');
const jwt = require('jsonwebtoken');
const tokenJSON = 'pochocloSecreto123';


const validarRegistro = (req, res, next) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }
  next();
};

// Registro
router.post('/registro', validarRegistro, async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario creado con éxito' });
  } catch (error) {
    res.status(400).json({ error: 'Error al registrar usuario', detalle: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });


    if (!usuario) return res.status(401).json({ error: 'Usuario no encontrado' });

    const esValida = await usuario.compararPassword(password);
    if (!esValida) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario._id, email: usuario.email }, tokenJSON, { expiresIn: '2h' });

    res.status(200).json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error en login', detalle: error.message });
  }
});

module.exports = router;
