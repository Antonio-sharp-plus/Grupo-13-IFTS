const express = require('express');
const router = express.Router();
const controllerResenas = require('../controller/controllerResenas');

router.post('/:userId', controllerResenas.agregarResena);
router.get('/:userId', controllerResenas.obtenerResenas);

router.post('/:userId/vistas', controllerResenas.agregarVista);
router.get('/:userId/vistas', controllerResenas.obtenerVistas);

router.put('/:resenaId', controllerResenas.editarResena);

router.get('/contenido/:contenidoId', controllerResenas.obtenerResenasPorContenido);

router.delete('/:resenaId', controllerResenas.eliminarResena);

module.exports = router;