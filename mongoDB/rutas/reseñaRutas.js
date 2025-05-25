const express = require('express');
const router = express.Router();
const {
  agregarReseña,
  obtenerReseñasPorContenido,
  obtenerReseñasPorUsuario
} = require('../controlador/reseñaControlador');

router.post('/', agregarReseña);
router.get('/contenido/:contenidoId', obtenerReseñasPorContenido);
router.get('/usuario/:usuarioId', obtenerReseñasPorUsuario);

module.exports = router;
