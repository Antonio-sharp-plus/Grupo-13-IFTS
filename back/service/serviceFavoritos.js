const repositorioFavoritos = require("../repositorio/repositorioFavoritos");

exports.agregarFavorito = async (userId, favoritoData) => {
  try {
    //console.log('Servicio: agregarFavorito', userId, favoritoData);
    let favorito = await repositorioFavoritos.buscarFavoritoPorId(favoritoData.id);
    if (!favorito) {
      favorito = await repositorioFavoritos.crearFavorito(favoritoData);
    }
    const usuario = await repositorioFavoritos.buscarUsuarioPorId(userId);
    if (!usuario) console.log('Usuario no encontrado');
    if (!usuario.favoritos.includes(favorito._id)) {
      usuario.favoritos.push(favorito._id);
      await repositorioFavoritos.guardarUsuario(usuario);
    }
  } catch (error) {
    //console.log('Servicio: agregarFavorito error', error);
    return console.log('Error al agregar favorito');
  }
};

exports.obtenerFavoritos = async (userId) => {
  try {
    //console.log('Servicio: obtenerFavoritos', userId);
    const usuario = await repositorioFavoritos.obtenerFavoritosDeUsuario(userId);
    if (!usuario) console.log('Usuario no encontrado');
    return usuario.favoritos;
  } catch (error) {
    //console.log('Service obtenerFavoritos error', error);
    return console.log('Error al obtener favoritos');
  }
};