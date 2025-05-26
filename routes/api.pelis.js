const express = require('express');
const router = express.Router();
const apiPelis = require('../public/back/apiPelis');

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

router.get('/masValoradas', async (req, res) => {
  try {
    const data = await apiPelis.BuscarPelisMejorValoradas();
    res.send(data);
  }
  catch (Error) {
    console.error('Error al cargar películas mas valoradas en server:', Error);
  }
});

router.get('/estrenos', async (req, res) => {
  try {
    const data = await apiPelis.BuscarEstrenos();
    res.send(data);
  }
  catch (Error) {
    console.error('Error al cargar películas en server:', Error);
  }
});

router.get('/accion', async (req, res) => {
  try {
    const data = await apiPelis.BuscarPelisAccion();
    res.send(data);
  }
  catch (Error) {
    console.error('Error al cargar películas en server:', Error);
  }
});

router.get('/comedia', async (req, res) => {
  try {
    const data = await apiPelis.BuscarPelisComedia();
    res.send(data);
  }
  catch (Error) {
    console.error('Error al cargar películas en server:', Error);
  }
});

router.get('/drama', async (req, res) => {
  try {
    const data = await apiPelis.BuscarPelisDrama();
    res.send(data);
  }
  catch (Error) {
    console.error('Error al cargar películas en server:', Error);
  }
});

router.get('/cienciaficcion', async (req, res) => {
  try {
    const data = await apiPelis.BuscarPelisCienciaFiccion();
    res.send(data);
  }
  catch (Error) {
    console.error('Error al cargar películas en server:', Error);
  }
});

module.exports = router;