const express = require('express');
const app = express();

const PORT = 3000;
const HOSTNAME = '127.0.0.1';

let path = require('path');
const api = require("./public/back/api.js");


app.use(express.static(path.join(__dirname, 'public', 'front', 'paginaPrincipal')));

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'front', 'paginaPrincipal', 'main.html'));
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`El servidor está corriendo en http://${HOSTNAME}:${PORT}/`);
});


