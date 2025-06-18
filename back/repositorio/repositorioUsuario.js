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

// Nuevo método para actualizar tokens de recuperación
exports.actualizarTokenRecuperacion = async (email, token, expiracion) => {
  return await Usuario.findOneAndUpdate(
    { email },
    { 
      resetPasswordToken: token,
      resetPasswordExpires: expiracion
    },
    { new: true }
  );
};

// Método para buscar usuario por token de recuperación
exports.buscarUsuarioPorToken = async (token) => {
  return await Usuario.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });
};

// Método para actualizar la contraseña y limpiar el token
exports.actualizarPassword = async (token, nuevaPasswordHasheada) => {
  return await Usuario.findOneAndUpdate(
    { resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } },
    {
      password: nuevaPasswordHasheada,
      resetPasswordToken: undefined,
      resetPasswordExpires: undefined
    },
    { new: true }
  );
};