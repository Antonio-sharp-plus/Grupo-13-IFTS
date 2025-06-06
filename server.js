const express = require('express');
const mongo = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));//envia los req.body como JSON

//rutas API
const peliculasRouter = require('./back/router/routerPeliAPI');
const seriesRouter = require('./back/router/routerSerieAPI');
const generalRouter = require('./back/router/routergeneralAPI');
const authRouter = require('./back/router/routerAuth');
const favoritosRouter = require('./back/router/routerFavoritos')

//variables de entorno
const PORT = 3000;
const HOSTNAME = '127.0.0.1';
const nombre_db = "mongooseAntonio";
const contra_db = "GSpjHIlsTDhb1H0c";

const connection_string = `mongodb+srv://${nombre_db}:${contra_db}@pochocleando.axbmjib.mongodb.net/pochocleando`;

app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Request-ID']
}));

// routers de las paginas
app.use('/api', generalRouter);
app.use('/api/pelicula', peliculasRouter);
app.use('/api/series', seriesRouter);
app.use('/api/auth', authRouter);
app.use('/api/favoritos', favoritosRouter);

mongo.connect(connection_string)
.then(console.log("Conectado a DB en Atlas"))
.catch(err => console.error("Error de conexión:", err));

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Servidor en http://${HOSTNAME}:${PORT}/`);
});