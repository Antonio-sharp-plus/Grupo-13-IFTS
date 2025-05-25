const mongoose = require('mongoose');

const esquemaContenido = new mongoose.Schema({
  titulo: { type: String, required: true },
  tipo: { type: String, enum: ['pelicula', 'serie'], required: true },
  descripcion: String,
  genero: [String],
  fechaEstreno: Date,
});

module.exports = mongoose.model('Contenido', esquemaContenido, 'contenidos');
