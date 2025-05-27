const express = require('express');
const router = express.Router();
const apiSeries = require('../metodosApi/apiSeries');

router.get('/populares', async (req, res) => {
  try {
    const data = await apiSeries.BuscarSeriesPopulares();
    res.json(data);
  } catch (error) {
    console.error('Error al cargar series:', error);
    res.status(500).send('Error interno del servidor');
  }
});

router.get('/masValoradas', async (req, res) => {
  try {
    const data = await apiSeries.BuscarSeriesMejorValoradas();
    res.json(data);
  } catch (error) {
    console.error('Error al cargar series:', error);
    res.status(500).send('Error interno del servidor');
  }
});

router.get('/comedia', async (req, res) => {
  try {
    const data = await apiSeries.BuscarSeriesComedia();
    res.json(data);
  } catch (error) {
    console.error('Error al cargar series:', error);
    res.status(500).send('Error interno del servidor');
  }
});

router.get('/drama', async (req, res) => {
  try {
    const data = await apiSeries.BuscarSeriesDrama();
    res.json(data);
  } catch (error) {
    console.error('Error al cargar series:', error);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;