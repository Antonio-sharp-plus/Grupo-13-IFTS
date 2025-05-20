const express = require('express');
const app = express();

const cors = require('cors');


const PORT = 3000;
const HOSTNAME = '127.0.0.1';

let path = require('path');
const api = require("./public/back/api.js");


app.use(express.static(path.join(__dirname, 'public', 'front', 'paginaPrincipal')));
app.use(express.static(path.join(__dirname, 'public', 'front', 'detallePelícula')));

app.use(cors({
  origin: 'http://localhost:4200/', // Reemplaza con tu URL de Angular
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/api/peliculas', async (req, res) => {
  try{
    const data = await api.BuscarPelisPopulares();
    res.send(data);
  }
  catch(Error)
  {
    console.error('Error al cargar películas en server:', Error);
  }
});

app.get('/api/detalles', async (req, res) => {
  try{
    const data = await api.BuscarDetallePeli();
    res.send(data);
  }
  catch(Error){
    console.error('No se recibieron los detalles de la película:', Error);
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'front', 'paginaPrincipal', 'main.html'));
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`El servidor está corriendo en http://${HOSTNAME}:${PORT}/`);
});


