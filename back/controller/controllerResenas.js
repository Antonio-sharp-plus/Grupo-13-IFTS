const serviceResenas = require('../service/servicioResenas');

exports.agregarResena = async (req, res) => {
  try {
    //console.log('Controller: agregarResena', req.body);
    const { userId } = req.params;
    const resena = await serviceResenas.agregarResena(userId, req.body);
    res.status(200).json(resena);
  } catch (error) {
    //console.log('Controller agregarResena error', error);
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerResenas = async (req, res) => {
  try {
    //console.log('Controller: obtenerResenas', req.params);
    const { userId } = req.params;
    const resenas = await serviceResenas.obtenerResenasDeUsuario(userId);
    res.status(200).json(resenas);
  } catch (error) {
    //console.log('Controller obtenerResenas error', error);
    res.status(400).json({ error: error.message });
  }
};

exports.editarResena = async (req, res) => {
  try {
    const { resenaId } = req.params;
    const { comentario } = req.body;
    const resena = await serviceResenas.editarResena(resenaId, comentario);
    res.status(200).json(resena);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerResenasPorContenido = async (req, res) => {
  try {
    //console.log('Controller: obtenerResenasPorContenido', req.params);
    const { contenidoId } = req.params;
    const resenas = await serviceResenas.obtenerResenasPorContenido(contenidoId);
    res.status(200).json(resenas);
  } catch (error) {
    //console.log('Controller obtenerResenasPorContenido error', error);
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarResena = async (req, res) => {
  try {
    //console.log('Controller: eliminarResena', req.params);
    const { resenaId } = req.params;
    await serviceResenas.eliminarResena(resenaId);
    res.status(204).send();
  } catch (error) {
    //console.log('Controller eliminarResena error', error);
    res.status(400).json({ error: error.message });
  }
};

exports.agregarVista = async (req, res) => {
  try {
    //console.log('Controller: agregarVista', req.body);
    const { userId } = req.params;
    const { contenidoId } = req.body;
    const vistas = await serviceResenas.agregarVista(userId, contenidoId);
    res.status(200).json(vistas);
  } catch (error) {
    //console.log('Controller agregarVista error', error);
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerVistas = async (req, res) => {
  try {
    //console.log('Controller: obtenerVistas', req.params);
    const { userId } = req.params;
    const vistas = await serviceResenas.obtenerVistas(userId);
    res.status(200).json(vistas);
  } catch (error) {
    //console.log('Controller obtenerVistas error', error);
    res.status(400).json({ error: error.message });
  }
};