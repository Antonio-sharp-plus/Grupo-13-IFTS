const repositorioFavoritos = require("../repositorio/repositorioFavoritos");

exports.agregarFavorito = async (userId, favoritoData) => {
  try {
    //console.log('Servicio: agregarFavorito', userId, favoritoData);
    let favorito = await repositorioFavoritos.buscarFavoritoPorId(favoritoData.id);
    if (!favorito) {
      favorito = await repositorioFavoritos.crearFavorito(favoritoData);
    }
    const usuario = await repositorioFavoritos.buscarUsuarioPorId(userId);
    if (!usuario) throw new Error('Usuario no encontrado');
    if (!usuario.favoritos.includes(favorito._id)) {
      usuario.favoritos.push(favorito._id);
      await repositorioFavoritos.guardarUsuario(usuario);
    }
  } catch (error) {
    //console.log('Servicio: agregarFavorito error', error);
    throw new Error('Error al agregar favorito: ' + error.message);
  }
};

exports.obtenerFavoritos = async (userId) => {
  try {
    //console.log('Servicio: obtenerFavoritos', userId);
    const usuario = await repositorioFavoritos.obtenerFavoritosDeUsuario(userId);
    if (!usuario) throw new Error('Usuario no encontrado');
    return usuario.favoritos;
  } catch (error) {
    //console.log('Servicio: obtenerFavoritos error', error);
    throw new Error('Error al obtener favoritos: ' + error.message);
  }
};

exports.eliminarFavorito = async (userId, favIdTMDB) => {
  try {
    //console.log('Servicio: eliminarFavorito', userId, favIdTMDB);
    const usuario = await repositorioFavoritos.buscarUsuarioPorId(userId);
    if (!usuario) throw new Error('Usuario no encontrado');

    const favorito = await repositorioFavoritos.buscarFavoritoPorId(favIdTMDB); // buscamos el fav según el id de tmdb
    if (!favorito) throw new Error('Favorito no encontrado');

    const favIdMongo = favorito._id;

    usuario.favoritos = usuario.favoritos.filter(favId => String(favId) !== String(favIdMongo));
    await repositorioFavoritos.guardarUsuario(usuario);

  } catch (error) {
    //console.log('Servicio: eliminarFavorito', error);
    throw new Error('Error al eliminar favorito: ' + error.message);
  }
}