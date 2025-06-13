const Usuario = require("../mongoDB/usuarios");
const Favorito = require("../mongoDB/favoritos");

exports.crearFavorito = async (favoritoData) => {
  //console.log('Repositorio: crearFavorito', favoritoData);
  const favorito = new Favorito(favoritoData);
  return await favorito.save();
};

exports.buscarFavoritoPorId = async (id) => {
  //console.log('Repositorio: buscarFavoritoPorId', id);
  return await Favorito.findOne({ id });
};

exports.buscarUsuarioPorId = async (userId) => {
  //console.log('Repositorio: buscarUsuarioPorId', userId);
  return await Usuario.findById(userId);
};

exports.guardarUsuario = async (usuario) => {
  //console.log('Repositorio: guardarUsuario', usuario);
  return await usuario.save();
};

exports.obtenerFavoritosDeUsuario = async (userId) => {
  //console.log('Repositorio: obtenerFavoritosDeUsuario', userId);
  return await Usuario.findById(userId).populate("favoritos");
};