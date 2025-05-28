const repoTMDB = require('../repositorio/repositorioTMDB')

async function BuscarTodo(nombre) {
    const datos = repoTMDB.BusquedaGeneral("ambos", nombre);
    try {
        let resultados = datos.results;
        return resultados;
    }
    catch {
        console.log("No se obtuvieron los datos de la API");
        return;
    }
}

async function BuscarPelículas(nombre) {
    const datos = repoTMDB.BusquedaGeneral("peliculas", nombre);
    try {
        let resultados = datos.results;
        return resultados;
    }
    catch {
        console.log("No se obtuvieron los datos de la API");
        return;
    }
}

async function BuscarSeries(nombre) {
    const datos = repoTMDB.BusquedaGeneral("series", nombre);
    try {
        let resultados = datos.results;
        return resultados;
    }
    catch {
        console.log("No se obtuvieron los datos de la API");
        return;
    }
}

async function BuscarPelículasPopulares() {
    const datos = repoTMDB.PelisPopulares();
    try {
        let resultados = datos.results;
        return resultados;
    }
    catch {
        console.log("No se obtuvieron los datos de la API");
        return;
    }
}

async function BuscarPelículasValoradas() {
    const datos = repoTMDB.PelisValoradas();
    try {
        let resultados = datos.results;
        return resultados;
    }
    catch {
        console.log("No se obtuvieron los datos de la API");
        return;
    }
}

async function BuscarPelículasEstreno() {
    const datos = repoTMDB.PelisEstreno();
    try {
        let resultados = datos.results;
        return resultados;
    }
    catch {
        console.log("No se obtuvieron los datos de la API");
        return;
    }
}

async function BuscarPelículasAccion() {
    const datos = repoTMDB.PelisAccion();
    try {
        let resultados = datos.results;
        return resultados;
    }
    catch {
        console.log("No se obtuvieron los datos de la API");
        return;
    }
}

async function BuscarPelículasComedia() {
    const datos = repoTMDB.PelisComedia();
    try {
        let resultados = datos.results;
        return resultados;
    }
    catch {
        console.log("No se obtuvieron los datos de la API");
        return;
    }
}

async function BuscarPelículasDrama() {
    const datos = repoTMDB.PelisDrama();
    try {
        let resultados = datos.results;
        return resultados;
    }
    catch {
        console.log("No se obtuvieron los datos de la API");
        return;
    }
}

async function BuscarPelículasSciFi() {
    const datos = repoTMDB.PelisSciFi();
    try {
        let resultados = datos.results;
        return resultados;
    }
    catch {
        console.log("No se obtuvieron los datos de la API");
        return;
    }
}

async function BuscarSeriesPopulares() {
    const datos = repoTMDB.SeriesPopulares();
    try {
        let resultados = datos.results;
        return resultados;
    }
    catch {
        console.log("No se obtuvieron los datos de la API");
        return;
    }
}

async function BuscarSeriesValoradas() {
    const datos = repoTMDB.SeriesValoradas();
    try {
        let resultados = datos.results;
        return resultados;
    }
    catch {
        console.log("No se obtuvieron los datos de la API");
        return;
    }
}

async function BuscarSeriesComedia() {
    const datos = repoTMDB.SeriesComedia();
    try {
        let resultados = datos.results;
        return resultados;
    }
    catch {
        console.log("No se obtuvieron los datos de la API");
        return;
    }
}

async function BuscarSeriesDrama() {
    const datos = repoTMDB.SeriesDrama();
    try {
        let resultados = datos.results;
        return resultados;
    }
    catch {
        console.log("No se obtuvieron los datos de la API");
        return;
    }
}

module.exports = {
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