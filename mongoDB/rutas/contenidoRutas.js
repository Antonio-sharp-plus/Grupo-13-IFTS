const express = require('express');
const router = express.Router();
const {
  agregarContenido,
  obtenerContenidos,
  obtenerContenidoPorId
} = require('../controlador/contenidoControlador');

router.post('/', agregarContenido);
router.get('/', obtenerContenidos);
router.get('/:id', obtenerContenidoPorId);

module.exports = router;
