const repositorioFavoritos = require('../repositorio/repositorioFavoritos');

exports.agregarFavorito = async (userId, favoritoData) => {

    try {
        if (!repositorioFavoritos.buscarFavoritoPorId(favoritoData.id)) {
          await repositorioFavoritos.crearFavorito(favoritoData);
        }

        const favorito = await repositorioFavoritos.buscarFavoritoPorId(favoritoData.id)

        console.log("Service anda hasta crear el favorito en BD")

        const usuario = await repositorioFavoritos.buscarUsuarioPorId(userId);
        console.log(usuario)

        const tieneFavoritos = await repositorioFavoritos.tieneFavorito(userId, favoritoData.id);
        console.log(tieneFavoritos)

        console.log("Service anda hasta encontrar al usuario")
        return await repositorioFavoritos.agregarFavoritoAUsuario(userId, favorito._id);
      } catch (error) {
        //console.log("Repositorio agregarFavoritoAUsuario error:", error);
        throw new Error(error.message || "Error al agregar favorito");
      }
      
};



exports.obtenerFavoritos = async (userId) => {
    try {
        //console.log("Repositorio obtenerFavoritosDeUsuario:", userId);
        if (! await repositorioFavoritos.buscarUsuarioPorId(userId)) throw new Error("Usuario no encontrado");
        const usuario = await repositorioFavoritos.usuarioConFavsPopulados(userId);
        return usuario.favoritos;
      } catch (error) {
        //console.log("Repositorio obtenerFavoritosDeUsuario error:", error);
        throw new Error(error.message || "Error al obtener favoritos del usuario");
      }
};