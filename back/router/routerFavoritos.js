const express = require('express');
const router = express.Router();
const controllerFavoritos = require('../controller/controllerFavoritos');

//agregar contenido como favorito
router.post('/:userId', controllerFavoritos.agregarFavorito);

//obtener contenido favorito
router.get('/:userId', controllerFavoritos.obtenerFavoritos);

// eliminar contenido favorito
router.delete('/:userId/:favoritoId', controllerFavoritos.eliminarFavorito);

module.exports = router;