const repositorioFavoritos = require('../repositorio/repositorioFavoritos');

exports.agregarFavorito = async (userId, favoritoData) => {
    await repositorioFavoritos.agregarFavoritoAUsuario(userId, favoritoData);
};

exports.obtenerFavoritos = async (userId) => {
    return await repositorioFavoritos.obtenerFavoritosDeUsuario(userId);
};