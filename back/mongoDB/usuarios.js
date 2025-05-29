const mongo = require('mongoose');

const schemaUsuario = new mongo.Schema({
    email: { type: String, required: true, unique: true},
    contraseña: { type: String, required: true, unique: true},
    username: { type: String, required: true, unique: true}
})