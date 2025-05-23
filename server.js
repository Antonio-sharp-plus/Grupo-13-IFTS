const express = require('express');
const app = express();

const cors = require('cors');

const PORT = 3000;
const HOSTNAME = '127.0.0.1';

const path = require('path')
const api = require('./public/back/api.js');

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

app.get('/api/pelicula/populares', async (req, res) => {
  try{
    const data = await api.BuscarPelisPopulares();
    res.json(data);
  }
  catch(Error)
  {
    console.error('Error al cargar películas en server:', Error);
  }
});

app.get('/api/pelicula/detalles', async (req, res) => {
  try{
    const data = await api.BuscarDetallePeli();
    res.send(data);
  }
  catch(Error){
    console.error('No se recibieron los detalles de la película:', Error);
  }
});

app.get('/api/pelicula/masValoradas', async (req, res) => {
  try{
    const data = await api.BuscarPelisMejorValoradas();
    res.send(data);
  }
  catch(Error)
  {
    console.error('Error al cargar películas mas valoradas en server:', Error);
  }
});

app.get('/api/pelicula/estrenos', async (req, res) => {
  try{
    const data = await api.BuscarEstrenos();
    res.send(data);
  }
  catch(Error)
  {
    console.error('Error al cargar películas en server:', Error);
  }
});

app.get('/api/pelicula/accion', async (req, res) => {
  try{
    const data = await api.BuscarPelisAccion();
    res.send(data);
  }
  catch(Error)
  {
    console.error('Error al cargar películas en server:', Error);
  }
});

app.get('/api/pelicula/comedia', async (req, res) => {
  try{
    const data = await api.BuscarPelisComedia();
    res.send(data);
  }
  catch(Error)
  {
    console.error('Error al cargar películas en server:', Error);
  }
});

app.get('/api/pelicula/drama', async (req, res) => {
  try{
    const data = await api.BuscarPelisDrama();
    res.send(data);
  }
  catch(Error)
  {
    console.error('Error al cargar películas en server:', Error);
  }
});

app.get('/api/pelicula/cienciaficcion', async (req, res) => {
  try{
    const data = await api.BuscarPelisCienciaFiccion();
    res.send(data);
  }
  catch(Error)
  {
    console.error('Error al cargar películas en server:', Error);
  }
});


app.get('/api/pelicula/buscar/:nombre', async (req, res) => {
  try{
    const nombre = req.params.nombre;

    if (!nombre || nombre.trim().length === 0) {
      return res.status(400).json({ 
        success: false,
        message: 'El parámetro "nombre" es requerido' 
      });
    }
    
    const data = await api.BuscarPeliPorNombre(nombre.trim());
    res.send(data);
  }
  catch(error){
    console.error('Error al buscar película:', error);
  }
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`El servidor está corriendo en http://${HOSTNAME}:${PORT}/`);
});


