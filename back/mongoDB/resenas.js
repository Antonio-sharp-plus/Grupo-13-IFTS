const mongo = require('mongoose');

const schemaResena = new mongo.Schema({
  usuario: { type: mongo.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  contenidoId: { type: String, required: true },
  tipo: { type: String, required: true },
  titulo: { type: String, required: true },
  comentario: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongo.model('Resena', schemaResena);