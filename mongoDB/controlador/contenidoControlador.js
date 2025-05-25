const Contenido = require('../modelo/Contenido');

const agregarContenido = async (req, res) => {
  try {
    const contenido = new Contenido(req.body);
    await contenido.save();
    res.status(201).json({ mensaje: 'Contenido agregado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
};

const obtenerContenidos = async (req, res) => {
  try {
    const contenidos = await Contenido.find();
    res.json(contenidos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
};

const obtenerContenidoPorId = async (req, res) => {
  try {
    const contenido = await Contenido.findById(req.params.id);
    if (!contenido) return res.status(404).json({ mensaje: 'Contenido no encontrado' });
    res.json(contenido);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
};

module.exports = {
  agregarContenido,
  obtenerContenidos,
  obtenerContenidoPorId
};
