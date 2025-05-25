const Usuario = require('../modelo/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const passwordJWT = 'contraseñaRePiola'; // cambialo por variable de entorno en prod

const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;
    const existeUsuario = await Usuario.findOne({ email });
    if (existeUsuario) return res.status(400).json({ mensaje: 'Email ya registrado' });

    const contraseñaHasheada = await bcrypt.hash(contraseña, 10);
    const usuario = new Usuario({ nombre, email, contraseña: contraseñaHasheada });
    await usuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ mensaje: 'Email o contraseña incorrectos' });

    const esValido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValido) return res.status(400).json({ mensaje: 'Email o contraseña incorrectos' });

    const token = jwt.sign({ id: usuario._id }, passwordJWT, { expiresIn: '1d' });
    res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email } });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario,
  passwordJWT
};
