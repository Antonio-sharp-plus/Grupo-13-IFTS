const repositorioFavoritos = require("../repositorio/repositorioFavoritos");

exports.agregarFavorito = async (userId, favoritoData) => {
  try {
    //console.log("Service: agregarFavorito", userId, favoritoData); //para controlar errores
    await repositorioFavoritos.agregarFavoritoAUsuario(userId, favoritoData);
  } catch (error) {
    //console.error("Service agregarFavorito error", error); //para controlar errores
    return console.log('Error al agregar favorito');
  }
};

exports.obtenerFavoritos = async (userId) => {
  try {
    //console.log("Service: obtenerFavoritos", userId); //para controlar errores
    return await repositorioFavoritos.obtenerFavoritosDeUsuario(userId);
  } catch (error) {
    //console.error("Service obtenerFavoritos error", error); //para controlar errores
    return console.log('Error al obtener favoritos');
  }
};
