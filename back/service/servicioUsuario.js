const jwt = require('jsonwebtoken');
const tokenJSON = 'pochocloSecreto123';
const repositorioUsuario = require('../repositorio/repositorioUsuario');

exports.registrarUsuario = async (data) => {
  try {
    //console.log('Service: registrarUsuario', data); //para controlar errores
    await repositorioUsuario.crearUsuario(data);
  } catch (error) {
    //console.log('Service registrarUsuario error', error);
    throw new Error('Error al registrar usuario: ' + error.message);
  }
};

exports.loginUsuario = async ({ email, password }) => {
  try {
    //console.log('Service: loginUsuario', { email, password }); //para controlar errores
    const usuario = await repositorioUsuario.buscarUsuarioPorEmail(email);
    if (!usuario) return console.log('Usuario no encontrado');
    const esValida = await usuario.compararPassword(password);
    if (!esValida) throw new Error('Contraseña incorrecta', + error.message);
    return jwt.sign({ id: usuario._id, email: usuario.email }, tokenJSON, { expiresIn: '2h' });
  } catch (error) {
    //console.log('Service loginUsuario error', error);
    throw new Error('Error al iniciar sesión: ' + error.message);
  }
};

exports.buscarUsuarioPorEmail = async (email) => {
  try {
    //console.log('Service: buscarUsuarioPorEmail', email); //para controlar errores
    return await repositorioUsuario.buscarUsuarioPorEmail(email);
  } catch (error) {
    //console.log('Service buscarUsuarioPorEmail error', error);
    throw new Error('Error al buscar usuario por email: ' + error.message);
  }
};