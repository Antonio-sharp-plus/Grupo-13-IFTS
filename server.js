const express = require('express');
const cors = require('cors');
const app = express();

const peliculasRouter = require('./routes/api.pelis');
const seriesRouter = require('./routes/api.series');
const generalRouter = require('./routes/api.general');

const PORT = 3000;
const HOSTNAME = '127.0.0.1';

// app.use((req, res, next) => {
//   res.removeHeader('Content-Security-Policy');
//   next();
// });

app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Request-ID']
}));

// Montar los routers
app.use('/api', generalRouter);
app.use('/api/pelicula', peliculasRouter);
app.use('/api/series', seriesRouter);

app.listen(PORT, HOSTNAME, () => {
  console.log(`Servidor en http://${HOSTNAME}:${PORT}/`);
});