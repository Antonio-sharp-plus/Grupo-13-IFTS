const express = require('express');
const router = express.Router();
const apiSeries = require('../public/back/apiSeries');

router.get('/populares', async (req, res) => {
  try {
    const data = await apiSeries.BuscarSeriesPopulares();
    res.json(data);
  } catch (error) {
    console.error('Error al cargar series:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// ... otros endpoints de series

module.exports = router;