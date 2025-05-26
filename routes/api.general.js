const express = require('express');
const router = express.Router();

router.get('/trending', async (req, res) => {
  try {
    const data = await apiSeries.Trending();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

router.get("/busqueda/:tipo/:termino", async (req, res) => {
  try {
    const data = await apiPelis.BusquedaGeneral(req.params.tipo, req.params.termino);
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;