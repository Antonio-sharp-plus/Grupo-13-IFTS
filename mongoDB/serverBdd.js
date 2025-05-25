require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarBaseDeDatos = require('./configuracion/baseDeDatos');

const rutasUsuario = require('./rutas/usuarioRutas');
const rutasContenido = require('./rutas/contenidoRutas');
const rutasReseña = require('./rutas/reseñaRutas');

const app = express();

conectarBaseDeDatos();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', rutasUsuario);
app.use('/api/contenidos', rutasContenido);
app.use('/api/reseñas', rutasReseña);

const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor MongoDB escuchando en puerto ${PORT}`));

