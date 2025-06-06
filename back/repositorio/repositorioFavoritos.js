const Usuario = require("../mongoDB/usuarios");
const Favorito = require("../mongoDB/favoritos");

exports.agregarFavoritoAUsuario = async (userId, favoritoData) => {
  try {
    //console.log("Repositorio agregarFavoritoAUsuario:", userId, favoritoData); // para controlar errores
    let favorito = await Favorito.findOne({ id: favoritoData.id });
    if (!favorito) {
      favorito = new Favorito(favoritoData);
      await favorito.save();
    }
    const usuario = await Usuario.findById(userId);
    if (!usuario) throw new Error("Usuario no encontrado");
    if (!usuario.favoritos.includes(favorito._id)) {
      usuario.favoritos.push(favorito._id);
      await usuario.save();
    }
  } catch (error) {
    //console.log("Repositorio agregarFavoritoAUsuario error:", error);
    throw new Error(error.message || "Error al agregar favorito");
  }
};

exports.obtenerFavoritosDeUsuario = async (userId) => {
  try {
    //console.log("Repositorio obtenerFavoritosDeUsuario:", userId);
    const usuario = await Usuario.findById(userId).populate("favoritos");
    if (!usuario) throw new Error("Usuario no encontrado");
    return usuario.favoritos;
  } catch (error) {
    //console.log("Repositorio obtenerFavoritosDeUsuario error:", error);
    throw new Error(error.message || "Error al obtener favoritos del usuario");
  }
};
