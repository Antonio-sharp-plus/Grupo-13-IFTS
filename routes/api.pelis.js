const express = require('express');
const router = express.Router();
const apiPelis = require('../public/back/apiPelis.js');

router.get('/populares', async (req, res) => {
  try {
    const data = await apiPelis.BuscarPelisPopulares();
    res.json(data);
  } catch (error) {
    console.error('Error al cargar películas:', error);
    res.status(500).send('Error interno del servidor');
  }
});

router.get('/detalles', async (req, res) => {
  try {
    const data = await apiPelis.BuscarDetallePeli();
    res.send(data);
  } catch (error) {
    console.error('Error al cargar detalles:', error);
    res.status(500).send('Error interno del servidor');
  }
});

router.get('/api/pelicula/masValoradas', async (req, res) => {
  try {
    const data = await apiPelis.BuscarPelisMejorValoradas();
    res.send(data);
  }
  catch (Error) {
    console.error('Error al cargar películas mas valoradas en server:', Error);
  }
});

router.get('/api/pelicula/estrenos', async (req, res) => {
  try {
    const data = await apiPelis.BuscarEstrenos();
    res.send(data);
  }
  catch (Error) {
    console.error('Error al cargar películas en server:', Error);
  }
});

router.get('/api/pelicula/accion', async (req, res) => {
  try {
    const data = await apiPelis.BuscarPelisAccion();
    res.send(data);
  }
  catch (Error) {
    console.error('Error al cargar películas en server:', Error);
  }
});

router.get('/api/pelicula/comedia', async (req, res) => {
  try {
    const data = await apiPelis.BuscarPelisComedia();
    res.send(data);
  }
  catch (Error) {
    console.error('Error al cargar películas en server:', Error);
  }
});

router.get('/api/pelicula/drama', async (req, res) => {
  try {
    const data = await apiPelis.BuscarPelisDrama();
    res.send(data);
  }
  catch (Error) {
    console.error('Error al cargar películas en server:', Error);
  }
});

router.get('/api/pelicula/cienciaficcion', async (req, res) => {
  try {
    const data = await apiPelis.BuscarPelisCienciaFiccion();
    res.send(data);
  }
  catch (Error) {
    console.error('Error al cargar películas en server:', Error);
  }
});

module.exports = router;