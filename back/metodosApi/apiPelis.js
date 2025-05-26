const API_KEY_TMDB = "0794702ad2b0918f600e5733c7ee0dea";
const url_popular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_TMDB}&language=es-ES`;
const url_mejor_valoradas = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY_TMDB}&language=es-ES`;
const url_estrenos = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY_TMDB}&language=es-ES`;
const url_pelis_accion = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&with_genres=28&language=es-ES&sort_by=popularity.desc&page=1`;
const url_pelis_comedia = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&with_genres=35&language=es-ES&sort_by=popularity.desc&page=1`;
const url_pelis_drama = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&with_genres=18&language=es-ES&sort_by=popularity.desc&page=1`;
const url_pelis_cienciaficcion = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&with_genres=878&language=es-ES&sort_by=popularity.desc&page=1`;


async function BusquedaGeneral(tipo, termino) {
    let url = "";
    if (tipo === 'peliculas') {
    url = `https://api.themoviedb.org/3/search/movie?query=${termino}&api_key=${API_KEY_TMDB}&language=es-ES`;
    } else if (tipo === 'series') {
    url = `https://api.themoviedb.org/3/search/tv?query=${termino}&api_key=${API_KEY_TMDB}&language=es-ES`;
    } else {
    url = `https://api.themoviedb.org/3/search/multi?query=${termino}&api_key=${API_KEY_TMDB}&language=es-ES`;
    }
    
    const response = await fetch(url);
    if(!response.ok) throw new Error("Error en la búsqueda.");
    const datosBusqueda = await response.json();
    return datosBusqueda;
}

async function BuscarPelisPopulares(){
    try 
    {
      const response = await fetch(url_popular);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const datos = await response.json();
      return datos; 
    } 
    catch (error) 
    {
      throw new Error(`Error al obtener películas: ${error.message}`);
    }
}

async function BuscarPelisMejorValoradas(){
    try 
    {
        const response = await fetch(url_mejor_valoradas);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const datos = await response.json();
        return datos; 
    } 
    catch (error) 
    {
        throw new Error(`Error al obtener películas: ${error.message}`);
    }
}

async function BuscarEstrenos(){
    try 
    {
        const response = await fetch(url_estrenos);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const datos = await response.json();
        return datos; 
    } 
    catch (error) 
    {
        throw new Error(`Error al obtener películas: ${error.message}`);
    }
}

async function BuscarPelisAccion(){
    try 
    {
        const response = await fetch(url_pelis_accion);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const datos = await response.json();
        return datos; 
    } 
    catch (error) 
    {
        throw new Error(`Error al obtener películas: ${error.message}`);
    }
}

async function BuscarPelisComedia(){
    try 
    {
        const response = await fetch(url_pelis_comedia);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const datos = await response.json();
        return datos; 
    } 
    catch (error) 
    {
        throw new Error(`Error al obtener películas: ${error.message}`);
    }
}

async function BuscarPelisDrama(){
    try 
    {
        const response = await fetch(url_pelis_drama);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const datos = await response.json();
        return datos; 
    } 
    catch (error) 
    {
        throw new Error(`Error al obtener películas: ${error.message}`);
    }
}

async function BuscarPelisCienciaFiccion(){
    try 
    {
        const response = await fetch(url_pelis_cienciaficcion);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const datos = await response.json();
        return datos; 
    } 
    catch (error) 
    {
        throw new Error(`Error al obtener películas: ${error.message}`);
    }
}

/*
async function BuscarDetallePeli(movie_id){
    try 
    {
        const response = await fetch("https://api.themoviedb.org/3/movie/" + movie_id);
        const datos = await response.json();
        return datos; 
    } 
    catch (error) 
    {
        throw new Error(`Error al obtener películas: ${error.message}`);
    }
}
    */


module.exports = {BusquedaGeneral, BuscarPelisPopulares, BuscarPelisMejorValoradas, BuscarEstrenos, BuscarPelisAccion, BuscarPelisComedia, BuscarPelisDrama, BuscarPelisCienciaFiccion}