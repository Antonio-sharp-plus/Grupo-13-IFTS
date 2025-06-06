const Usuario = require('../mongoDB/usuarios');
const jwt = require('jsonwebtoken');
const tokenJSON = 'pochocloSecreto123';

exports.registrarUsuario = async (data) => {
  try {
    //console.log('Service: registrarUsuario', data); //para controlar errores
    const nuevoUsuario = new Usuario(data);
    await nuevoUsuario.save();
  } catch (error) {
    //console.log('Service registrarUsuario error', error);
    return console.log('Error al registrar usuario:', error.message || 'Error al crear el usuario');
  }
};

exports.loginUsuario = async ({ email, password }) => {
  try {
    //console.log('Service: loginUsuario', { email, password }); //para controlar errores
    const usuario = await Usuario.findOne({ email });
    if (!usuario) throw new Error('Usuario no encontrado');
    const esValida = await usuario.compararPassword(password);
    if (!esValida) throw new Error('Contraseña incorrecta');
    return jwt.sign({ id: usuario._id, email: usuario.email }, tokenJSON, { expiresIn: '2h' });
  } catch (error) {
    //console.log('Service loginUsuario error', error);
    throw new Error(error.message || 'Error al iniciar sesión');
  }
};

exports.buscarUsuarioPorEmail = async (email) => {
  return await Usuario.findOne({ email });
};