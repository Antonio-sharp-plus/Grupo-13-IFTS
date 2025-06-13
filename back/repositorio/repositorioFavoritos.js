const Usuario = require("../mongoDB/usuarios");
const Favorito = require("../mongoDB/favoritos");

exports.agregarFavoritoAUsuario = async (userId, favoritoData) => {
  //console.log("Repositorio agregarFavoritoAUsuario:", userId, favoritoData);
  let favorito = await Favorito.findOne({ id: favoritoData.id });
  if (!favorito) {
    favorito = new Favorito(favoritoData);
    await favorito.save();
  }
  const usuario = await Usuario.findById(userId);
  //console.log("Repositorio agregarFavoritoAUsuario usuario:", usuario);
  if (!usuario) throw new Error("Usuario no encontrado");
  if (!usuario.favoritos.includes(favorito._id)) {
    usuario.favoritos.push(favorito._id);
    await usuario.save();
  }
};

exports.obtenerFavoritosDeUsuario = async (userId) => {
  //console.log("Repositorio obtenerFavoritosDeUsuario:", userId);
  const usuario = await Usuario.findById(userId).populate("favoritos");
  if (!usuario) throw new Error("Usuario no encontrado");
  return usuario.favoritos;
};