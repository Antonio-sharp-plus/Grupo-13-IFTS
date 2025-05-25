const mongoose = require('mongoose');

const esquemaReseña = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  contenido: { type: mongoose.Schema.Types.ObjectId, ref: 'Contenido', required: true },
  comentario: String,
  calificacion: { type: Number, min: 1, max: 10, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resena', esquemaReseña, 'resenas');