const servicioTMDB = require('../service/servicioTMDB');

async function BuscarTodo(req, res) {
    try {
        const nombre = req.params.nombre;
        const datos = await servicioTMDB.BuscarTodo(nombre);
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function Trending(req, res) {
    try {
        const datos = await servicioTMDB.Trending();
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarPelículas(req, res, nombre) {
    try {
        const nombre = req.params.nombre;
        const datos = await servicioTMDB.BuscarPelículas(nombre);
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarSeries(req, res, nombre) {
    try {
        const nombre = req.params.nombre;
        const datos = await servicioTMDB.BuscarSeries(nombre);
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarPelículasPopulares(req, res) {
    try {
        const datos = await servicioTMDB.BuscarPelículasPopulares();
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarPelículasValoradas(req, res) {
    try {
        const datos = await servicioTMDB.BuscarPelículasValoradas();
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarPelículasEstreno(req, res) {
    try {
        const datos = await servicioTMDB.BuscarPelículasEstreno();
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarPelículasAccion(req, res) {
    try {
        const datos = await servicioTMDB.BuscarPelículasAccion();
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarPelículasComedia(req, res) {
    try {
        const datos = await servicioTMDB.BuscarPelículasComedia();
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarPelículasDrama(req, res) {
    try {
        const datos = await servicioTMDB.BuscarPelículasDrama();
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarPelículasSciFi(req, res) {
    try {
        const datos = await servicioTMDB.BuscarPelículasSciFi();
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarSeriesPopulares(req, res) {
    try {
        const datos = await servicioTMDB.BuscarSeriesPopulares();
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarSeriesValoradas(req, res) {
    try {
        const datos = await servicioTMDB.BuscarSeriesValoradas();
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarSeriesComedia(req, res) {
    try {
        const datos = await servicioTMDB.BuscarSeriesComedia();
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarSeriesDrama(req, res) {
    try {
        const datos = await servicioTMDB.BuscarSeriesDrama();
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    Trending,
    BuscarTodo,
    BuscarPelículas,
    BuscarSeries,
    BuscarPelículasAccion,
    BuscarPelículasComedia,
    BuscarPelículasDrama,
    BuscarPelículasEstreno,
    BuscarPelículasPopulares,
    BuscarPelículasSciFi,
    BuscarPelículasValoradas,
    BuscarSeriesComedia,
    BuscarSeriesDrama,
    BuscarSeriesPopulares,
    BuscarSeriesValoradas
}