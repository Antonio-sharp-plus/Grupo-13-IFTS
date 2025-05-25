const mongoose = require('mongoose');

const uri = "mongodb+srv://eliannahuel0348:XonwfmXPFTuqXN3O@pochocleando.axbmjib.mongodb.net/pochocleando?retryWrites=true&w=majority&appName=Pochocleando";

const conectarBaseDeDatos = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Conectado exitosamente a MongoDB Atlas');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = conectarBaseDeDatos;