const express = require('express');
const app = express();

const cors = require('cors');

const PORT = 3000;
const HOSTNAME = '127.0.0.1';

const path = require('path')
const apiPelis = require('./public/back/apiPelis.js');
const apiSeries = require('./public/back/apiSeries.js')

app.use((req, res, next) => {
  // Elimina políticas restrictivas para desarrollo
  res.removeHeader('Content-Security-Policy');
  next();
});

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/*
app.get('/api/test', (req, res) => {
  res.json({ message: "¡Backend funciona!" });
});
*/

app.get("/api/busqueda/:tipo/:termino", async (req, res) => {
  try{
    const data = await apiPelis.BusquedaGeneral(req.params.tipo, req.params.termino);
    res.json(data)
  }
  catch (Error){
    console.error('Error al cargar busquedas: ', Error);
  }
});

app.get("/api/series/populares", async (req, res) => {
  try {
    const data = await apiSeries.BuscarSeriesPopulares();
    res.json(data);
  }
  catch (Error) {
    console.error('Error al cargar series en server:', Error);
  }
});

app.get('/api/pelicula/populares', async (req, res) => {
  try {
    const data = await apiPelis.BuscarPelisPopulares();
    res.json(data);
  }
  catch (Error) {
    console.error('Error al cargar películas en server:', Error);
  }
});

app.get('/api/pelicula/detalles', async (req, res) => {
  try {
    const data = await apiPelis.BuscarDetallePeli();
    res.send(data);
  }
  catch (Error) {
    console.error('No se recibieron los detalles de la película:', Error);
  }
});

app.get('/api/pelicula/masValoradas', async (req, res) => {
  try {
    const data = await apiPelis.BuscarPelisMejorValoradas();
    res.send(data);
  }
  catch (Error) {
    console.error('Error al cargar películas mas valoradas en server:', Error);
  }
});

app.get('/api/pelicula/estrenos', async (req, res) => {
  try {
    const data = await apiPelis.BuscarEstrenos();
    res.send(data);
  }
  catch (Error) {
    console.error('Error al cargar películas en server:', Error);
  }
});

app.get('/api/pelicula/accion', async (req, res) => {
  try {
    const data = await apiPelis.BuscarPelisAccion();
    res.send(data);
  }
  catch (Error) {
    console.error('Error al cargar películas en server:', Error);
  }
});

app.get('/api/pelicula/comedia', async (req, res) => {
  try {
    const data = await apiPelis.BuscarPelisComedia();
    res.send(data);
  }
  catch (Error) {
    console.error('Error al cargar películas en server:', Error);
  }
});

app.get('/api/pelicula/drama', async (req, res) => {
  try {
    const data = await apiPelis.BuscarPelisDrama();
    res.send(data);
  }
  catch (Error) {
    console.error('Error al cargar películas en server:', Error);
  }
});

app.get('/api/pelicula/cienciaficcion', async (req, res) => {
  try {
    const data = await apiPelis.BuscarPelisCienciaFiccion();
    res.send(data);
  }
  catch (Error) {
    console.error('Error al cargar películas en server:', Error);
  }
});


app.get('/api/pelicula/buscar/:nombre', async (req, res) => {
  try {
    const nombre = req.params.nombre;

    if (!nombre || nombre.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El parámetro "nombre" es requerido'
      });
    }

    const data = await apiPelis.BuscarPeliPorNombre(nombre.trim());
    res.send(data);
  }
  catch (error) {
    console.error('Error al buscar película:', error);
  }
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`El servidor está corriendo en http://${HOSTNAME}:${PORT}/`);
});


