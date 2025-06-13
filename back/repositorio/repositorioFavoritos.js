const Usuario = require("../mongoDB/usuarios");
const Favorito = require("../mongoDB/favoritos");

exports.buscarFavoritoPorId = async (favoritoId) => {
  return await Favorito.findOne({ id: favoritoId });
}

exports.crearFavorito = async (favoritoData) => {
  const favorito = new Favorito(favoritoData);
  return await favorito.save();
}

exports.buscarUsuarioPorId = async (userId) => {
  return await Usuario.findById(userId);
}

exports.usuarioConFavsPopulados = async (userId) => {
  return await Usuario.findById(userId).populate("favoritos")
}

exports.tieneFavorito = async (userId, favoritoData) => {
  const usuario = await Usuario.findById(userId);
  return usuario.favoritos.includes(favoritoData._id)
}

exports.agregarFavoritoAUsuario = async (userId, favoritoData) => {
  const usuario = await Usuario.findById(userId);
  await usuario.favoritos.push(favoritoData);
  console.log("Repo anda");
  await usuario.save();
};

