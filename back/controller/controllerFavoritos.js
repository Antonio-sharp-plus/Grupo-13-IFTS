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
    res.status(400).json({ error: error.message });
  }
};