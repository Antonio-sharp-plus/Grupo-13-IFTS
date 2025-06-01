const Usuario = require('../mongoDB/usuarios');
const jwt = require('jsonwebtoken');
const tokenJSON = 'pochocloSecreto123';

exports.registrarUsuario = async (data) => {
  //console.log('Service: registrarUsuario', data); //para controlar errores
  const nuevoUsuario = new Usuario(data);
  await nuevoUsuario.save();
};

exports.loginUsuario = async ({ email, password }) => {
  //console.log('Service: loginUsuario', email); //para controlar errores
  const usuario = await Usuario.findOne({ email });
  if (!usuario) throw new Error('Usuario no encontrado');
  const esValida = await usuario.compararPassword(password);
  if (!esValida) throw new Error('Contraseña incorrecta');
  return jwt.sign({ id: usuario._id, email: usuario.email }, tokenJSON, { expiresIn: '2h' });
};