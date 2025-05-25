const Reseña = require('../modelo/Reseña');

const agregarReseña = async (req, res) => {
  try {
    const reseña = new Reseña(req.body);
    await reseña.save();
    res.status(201).json({ mensaje: 'Reseña agregada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
};

const obtenerReseñasPorContenido = async (req, res) => {
  try {
    const { contenidoId } = req.params;
    const reseñas = await Reseña.find({ contenido: contenidoId })
      .populate('usuario', 'nombre')
      .sort({ fecha: -1 });
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
};

const obtenerReseñasPorUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const reseñas = await Reseña.find({ usuario: usuarioId })
      .populate('contenido', 'titulo tipo')
      .sort({ fecha: -1 });
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
};

module.exports = {
  agregarReseña,
  obtenerReseñasPorContenido,
  obtenerReseñasPorUsuario
};
