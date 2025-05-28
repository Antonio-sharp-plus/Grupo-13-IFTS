base_url = 'https://api.themoviedb.org/3';
api_key = '0794702ad2b0918f600e5733c7ee0dea';
lenguaje = 'es-ES';

async function BusquedaGeneral(tipo, query) {

    if (tipo === "peliculas") {
        const response = await fetch(`${baseURL}/search/movies?query=${query}&api_key=${api_key}&language=${lenguaje}`)
        return response.data;
    } else if (tipo === "series") {
        const response = await fetch(`${baseURL}/search/tv?query=${query}&api_key=${api_key}&language=${lenguaje}`)
        return response.data;
    } else {
        const response = await fetch(`${baseURL}/search/multi?query=${query}&api_key=${api_key}&language=${lenguaje}`)
        return response.data;
    }

}

async function Trending() {
    const response = await fetch(`${baseURL}/trending/all/week?api_key=${api_key}&language=${lenguaje}`)
    return response.data;
}

async function PelisPopulares() {
    const response = await fetch(`${baseURL}/movie/popular?api_key=${api_key}&language=${lenguaje}`)
    return response.data;
}

async function PelisValoradas() {
    const response = await fetch(`${baseURL}/movie/top_rated?api_key=${api_key}&language=${lenguaje}`)
    return response.data;
}

async function PelisEstreno() {
    const response = await fetch(`${baseURL}/movie/upcoming?api_key=${api_key}&language=${lenguaje}`)
    return response.data;
}

async function PelisAccion() {
    const response = await fetch(`${baseURL}/discover/movie?api_key=${api_key}&language=${lenguaje}&with_genres=28`)
    return response.data;
}

async function PelisComedia() {
    const response = await fetch(`${baseURL}/discover/movie?api_key=${api_key}&language=${lenguaje}&with_genres=35`)
    return response.data;
}

async function PelisDrama() {
    const response = await fetch(`${baseURL}/discover/movie?api_key=${api_key}&language=${lenguaje}&with_genres=18`)
    return response.data;
}

async function PelisSciFi() {
    const response = await fetch(`${baseURL}/discover/movie?api_key=${api_key}&language=${lenguaje}&with_genres=878`)
    return response.data;
}

async function SeriesPopulares() {
    const response = await fetch(`${baseURL}/tv/popular?api_key=${api_key}&language=${lenguaje}`)
    return response.data;
}

async function SeriesValoradas() {
    const response = await fetch(`${baseURL}/tv/top_rated?api_key=${api_key}&language=${lenguaje}`)
    return response.data;
}

async function SeriesComedia() {
    const response = await fetch(`${baseURL}/discover/tv?api_key=${api_key}&language=${lenguaje}&with_genres=35`)
    return response.data;
}

async function SeriesDrama() {
    const response = await fetch(`${baseURL}/discover/tv?api_key=${api_key}&language=${lenguaje}&with_genres=18`)
    return response.data;
}

module.exports = {
    BusquedaGeneral,
    Trending,
    PelisPopulares,
    PelisValoradas,
    PelisEstreno,
    PelisAccion,
    PelisComedia,
    PelisDrama,
    PelisSciFi,
    SeriesPopulares,
    SeriesValoradas,
    SeriesComedia,
    SeriesDrama
}
