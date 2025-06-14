const Usuario = require('../mongoDB/usuarios');

exports.crearUsuario = async (data) => {
  //console.log('Repositorio: crearUsuario', data); // para controlar errores
  const nuevoUsuario = new Usuario(data);
  return await nuevoUsuario.save();
};

exports.buscarUsuarioPorEmail = async (email) => {
  //console.log('Repositorio: buscarUsuarioPorEmail', email); // para controlar errores
  return await Usuario.findOne({ email });
};