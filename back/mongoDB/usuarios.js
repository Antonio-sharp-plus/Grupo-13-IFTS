const mongo = require('mongoose');
const bcrypt = require('bcrypt');

const schemaUsuario = new mongo.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    username: { type: String, required: true, unique: true},
    favoritos: [{ type: mongo.Schema.Types.ObjectId, ref: 'Favorito' }],
    reseñas: [{ type: mongo.Schema.Types.ObjectId, ref: 'Resena' }],
    vistas: [{ type: String }],
    fechaRegistro: { type: Date, default: Date.now },
    resetPasswordToken: {type: String},
    resetPasswordExpires: {type: Date}
});

// Método para encriptar password
schemaUsuario.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Método para comparar passwords
schemaUsuario.methods.compararPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongo.model('Usuario', schemaUsuario);