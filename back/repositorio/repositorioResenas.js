const Resena = require('../mongoDB/resenas');
const Usuario = require('../mongoDB/usuarios');

exports.crearResena = async (resenaData) => {
    //console.log('Repositorio: crearResena', resenaData);
  return await Resena.create(resenaData);
};

exports.obtenerResenasPorUsuario = async (userId) => {
    //console.log('Repositorio: obtenerResenasPorUsuario', userId);
  return await Resena.find({ usuario: userId });
};

exports.obtenerResenasPorContenido = async (contenidoId) => {
  return await Resena.find({ contenidoId }).populate('usuario', 'username');
};

exports.editarResena = async (resenaId, comentario) => {
  return await Resena.findByIdAndUpdate(resenaId, { comentario }, { new: true });
};

exports.eliminarResena = async (resenaId) => {
  return await Resena.findByIdAndDelete(resenaId);
};
