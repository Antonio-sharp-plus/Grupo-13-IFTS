const Usuario = require('../mongoDB/usuarios');

exports.crearUsuario = async (data) => {
  const nuevoUsuario = new Usuario(data);
  return await nuevoUsuario.save();
};

exports.buscarUsuarioPorEmail = async (email) => {
  return await Usuario.findOne({ email });
};