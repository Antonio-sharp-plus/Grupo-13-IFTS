const mongo = require('mongoose');

const schemaFavoritos = new mongo.Schema({
    id: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    poster: { type: String, required: true },
    anio: { type: String, required: true },
    tipo: { type: String, required: true },
    puntaje: { type: Number, required: true }
})

module.exports = mongo.model('Favorito', schemaFavoritos);