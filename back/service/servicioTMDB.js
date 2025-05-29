const repoTMDB = require('../repositorio/repositorioTMDB')

async function Trending() {
    try {
        const datos = await repoTMDB.Trending();
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarTodo(nombre) {
    try {
        const datos = await repoTMDB.BusquedaGeneral("ambos", nombre);
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarPelículas(nombre) {
    try {
        const datos = await repoTMDB.BusquedaGeneral("peliculas", nombre);
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarSeries(nombre) {
    try {
        const datos = await repoTMDB.BusquedaGeneral("series", nombre);
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarPelículasPopulares() {
    try {
        const datos = await repoTMDB.PelisPopulares();
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarPelículasValoradas() {
    try {
        const datos = await repoTMDB.PelisValoradas();
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarPelículasEstreno() {
    try {
        const datos = await repoTMDB.PelisEstreno();
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarPelículasAccion() {
    try {
        const datos = await repoTMDB.PelisAccion();
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarPelículasComedia() {
    try {
        const datos = await repoTMDB.PelisComedia();
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarPelículasDrama() {
    try {
        const datos = await repoTMDB.PelisDrama();
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarPelículasSciFi() {
    try {
        const datos = await repoTMDB.PelisSciFi();
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarSeriesPopulares() {
    try {
        const datos = await repoTMDB.SeriesPopulares();
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarSeriesValoradas() {
    try {
        const datos = await repoTMDB.SeriesValoradas();
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarSeriesComedia() {
    try {
        const datos = await repoTMDB.SeriesComedia();
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarSeriesDrama() {
    try {
        const datos = await repoTMDB.SeriesDrama();
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

module.exports = {
    Trending,
    BuscarPelículas,
    BuscarPelículasAccion,
    BuscarPelículasComedia,
    BuscarPelículasDrama,
    BuscarPelículasEstreno,
    BuscarPelículasPopulares,
    BuscarPelículasSciFi,
    BuscarPelículasValoradas,
    BuscarSeries,
    BuscarSeriesComedia,
    BuscarSeriesDrama,
    BuscarSeriesPopulares,
    BuscarSeriesValoradas,
    BuscarTodo
}