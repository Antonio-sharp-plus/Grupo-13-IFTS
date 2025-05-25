const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI; // Tomamos la URI desde .env

const conectarBaseDeDatos = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Conexión exitosa a MongoDB Atlas");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
};

module.exports = conectarBaseDeDatos;
