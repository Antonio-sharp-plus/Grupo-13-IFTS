base_url = 'https://api.themoviedb.org/3';
api_key = '0794702ad2b0918f600e5733c7ee0dea';
lenguaje = 'es-ES';

async function BuscarId(id, tipo){
    const response = await fetch(`${base_url}/${tipo}/${id}?api_key=${api_key}&language=${lenguaje}`);
    return response.json();
}

async function BusquedaGeneral(tipo, query) {

    if (tipo === "peliculas") {
        const response = await fetch(`${base_url}/search/movies?query=${query}&api_key=${api_key}&language=${lenguaje}`)
        return response.json();
    } else if (tipo === "series") {
        const response = await fetch(`${base_url}/search/tv?query=${query}&api_key=${api_key}&language=${lenguaje}`)
        return response.json();
    } else {
        const response = await fetch(`${base_url}/search/multi?query=${query}&api_key=${api_key}&language=${lenguaje}`)
        return response.json();
    }

}

async function Trending() {
    const response = await fetch(`${base_url}/trending/all/week?api_key=${api_key}&language=${lenguaje}`);
    return response.json();
}


async function PelisPopulares() {
    const response = await fetch(`${base_url}/movie/popular?api_key=${api_key}&language=${lenguaje}`)
    return response.json();
}

async function PelisValoradas() {
    const response = await fetch(`${base_url}/movie/top_rated?api_key=${api_key}&language=${lenguaje}`)
    return response.json();
}

async function PelisEstreno() {
    const response = await fetch(`${base_url}/movie/upcoming?api_key=${api_key}&language=${lenguaje}`)
    return response.json();
}

async function PelisAccion() {
    const response = await fetch(`${base_url}/discover/movie?api_key=${api_key}&language=${lenguaje}&with_genres=28`)
    return response.json();
}

async function PelisComedia() {
    const response = await fetch(`${base_url}/discover/movie?api_key=${api_key}&language=${lenguaje}&with_genres=35`)
    return response.json();
}

async function PelisDrama() {
    const response = await fetch(`${base_url}/discover/movie?api_key=${api_key}&language=${lenguaje}&with_genres=18`)
    return response.json();
}

async function PelisSciFi() {
    const response = await fetch(`${base_url}/discover/movie?api_key=${api_key}&language=${lenguaje}&with_genres=878`)
    return response.json();
}

async function SeriesPopulares() {
    const response = await fetch(`${base_url}/tv/popular?api_key=${api_key}&language=${lenguaje}`)
    return response.json();
}

async function SeriesValoradas() {
    const response = await fetch(`${base_url}/tv/top_rated?api_key=${api_key}&language=${lenguaje}`)
    return response.json();
}

async function SeriesComedia() {
    const response = await fetch(`${base_url}/discover/tv?api_key=${api_key}&language=${lenguaje}&with_genres=35`)
    return response.json();
}

async function SeriesDrama() {
    const response = await fetch(`${base_url}/discover/tv?api_key=${api_key}&language=${lenguaje}&with_genres=18`)
    return response.json();
}

module.exports = {
    BuscarId,
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

