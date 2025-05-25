const mongoose = require('mongoose');

const esquemaUsuario = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  vistos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contenido' }]
});

module.exports = mongoose.model('Usuario', esquemaUsuario, 'usuarios');
