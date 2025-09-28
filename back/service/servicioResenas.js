const repositorioResenas = require('../repositorio/repositorioResenas');

exports.agregarResena = async (userId, resenaData) => {
  try {
    //console.log('Servicio: agregarResena', userId, resenaData);
    if (!resenaData.comentario || !resenaData.titulo || !resenaData.tipo || !resenaData.contenidoId) {
      throw new Error('Faltan campos obligatorios');
    }
    return await repositorioResenas.crearResena({ ...resenaData, usuario: userId });
  } catch (error) {
    //console.log('Servicio: agregarReseña Error al agregar reseña:', error);
    throw new Error(error.message || 'Error al agregar reseña');
  }
};

exports.obtenerResenasDeUsuario = async (userId) => {
  try {
    //console.log('Servicio: obtenerResenasDeUsuario', userId);
    return await repositorioResenas.obtenerResenasPorUsuario(userId);
  } catch (error) {
    //console.log('Servicio: obtenerResenasDeUsuario Error:', error);
    throw new Error(error.message || 'Error al obtener reseñas');
  }
};

exports.editarResena = async (resenaId, comentario) => {
  try {
    //console.log('Servicio: editarResena', resenaId, comentario);
    return await repositorioResenas.editarResena(resenaId, comentario);
  } catch (error) {
    //console.log('Servicio: editarResena Error:', error);
    throw new Error(error.message || 'Error al editar reseña');
  }
};

exports.obtenerResenasPorContenido = async (contenidoId) => {
  try {
    //console.log('Servicio: obtenerResenasPorContenido', contenidoId);
    return await repositorioResenas.obtenerResenasPorContenido(contenidoId);
  } catch (error) {
    //console.log('Servicio: obtenerResenasPorContenido Error:', error);
    throw new Error(error.message || 'Error al obtener reseñas');
  }
};

exports.eliminarResena = async (resenaId) => {
  try {
    //console.log('Servicio: eliminarResena', resenaId);
    return await repositorioResenas.eliminarResena(resenaId);
  } catch (error) {
    //console.log('Servicio: eliminarResena Error:', error);
    throw new Error(error.message || 'Error al eliminar reseña');
  }
};

exports.agregarVista = async (userId, contenidoId) => {
  try {
    //console.log('Servicio: agregarVista', userId, contenidoId);
    const usuario = await repositorioResenas.agregarVistaAUsuario(userId, contenidoId);
    if (!usuario) throw new Error('Usuario no encontrado');
    return usuario.vistas;
  } catch (error) {
    //console.log('Servicio: agregarVista Error:', error);
    throw new Error(error.message || 'Error al agregar vista');
  }
};

exports.obtenerVistas = async (userId) => {
  try {
    //console.log('Servicio: obtenerVistas', userId);
    const usuario = await repositorioResenas.obtenerVistasDeUsuario(userId);
    if (!usuario) throw new Error('Usuario no encontrado');
    return usuario.vistas;
  } catch (error) {
    //console.log('Servicio: obtenerVistas Error:', error);
    throw new Error(error.message || 'Error al obtener vistas');
  }
};