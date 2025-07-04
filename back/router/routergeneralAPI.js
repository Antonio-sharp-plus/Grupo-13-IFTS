const express = require("express");
const router = express.Router();
const controllerAPI = require("../controller/controllerAPI");

router.get('/trending', controllerAPI.Trending);
router.get('/buscar/:nombre', controllerAPI.BuscarTodo);
router.get('/buscarid/:id/:tipo', controllerAPI.BuscarId);

module.exports = router;