const jwt = require('jsonwebtoken');
const tokenJSON = 'pochocloSecreto123';
const repositorioUsuario = require('../repositorio/repositorioUsuario');

exports.registrarUsuario = async (data) => {
  try {
    //console.log('Servicio: registrarUsuario', data);
    await repositorioUsuario.crearUsuario(data);
  } catch (error) {
    //console.log('Servicio: registrarUsuario error', error);
    throw new Error('Error al registrar usuario: ' + error.message);
  }
};

exports.loginUsuario = async ({ email, password }) => {
  try {
    //console.log('Servicio: loginUsuario', { email, password });
    const usuario = await repositorioUsuario.buscarUsuarioPorEmail(email);
    if (!usuario) return console.log('Usuario no encontrado');
    const esValida = await usuario.compararPassword(password);
    if (!esValida) return console.log('Contraseña incorrecta');
    return jwt.sign({ id: usuario._id, email: usuario.email }, tokenJSON, { expiresIn: '2h' });
  } catch (error) {
    //console.log('Servicio: loginUsuario error', error);
    throw new Error('Error al iniciar sesión: ' + error.message);
  }
};

exports.buscarUsuarioPorEmail = async (email) => {
  try {
    //console.log('Servicio: buscarUsuarioPorEmail', email); //para controlar errores
    return await repositorioUsuario.buscarUsuarioPorEmail(email);
  } catch (error) {
    //console.log('Servicio: buscarUsuarioPorEmail error', error);
    throw new Error('Error al buscar usuario por email: ' + error.message);
  }
};