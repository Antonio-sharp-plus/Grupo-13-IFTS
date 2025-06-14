const serviceFavoritos = require('../service/serviceFavoritos');

exports.agregarFavorito = async (req, res) => {
    try{
        //console.log('Controller: agregarFavorito', req.body) //para controlar errores
        const { userId } = req.params;
        const { favorito } = req.body;
        await serviceFavoritos.agregarFavorito(userId, favorito);
        res.status(200).json({ mensaje: 'Favorito agregado' });
    }
    catch(error){
        //console.log('Controller: agregarFavorito error', error); //para controlar errores
        res.status(400).json({ error: error.message });
    }
};

exports.obtenerFavoritos = async (req, res) => {
  try {
    //console.log('Controller: obtenerFavoritos', req.params); //para controlar errores
    const { userId } = req.params;
    const favoritos = await serviceFavoritos.obtenerFavoritos(userId);
    res.status(200).json(favoritos);
  } catch (error) {
    //console.log('Controller: obtenerFavoritos error', error); //para controlar errores
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarFavorito = async (req, res) => {
  try {
    //console.log('Controller: eliminarFavorito', req.params); //para controlar errores
    const { userId, favoritoId } = req.params;
    await serviceFavoritos.eliminarFavorito(userId, favoritoId);
    res.status(200).json({ mensaje: 'Favorito eliminado correctamente' });
  } catch (error) {
    //console.log('Controller: eliminarFavorito error', error); //para controlar errores
    res.status(400).json({ error: error.message });
  }
}