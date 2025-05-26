const API_KEY_TMDB = "0794702ad2b0918f600e5733c7ee0dea";
const url_series_popular = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY_TMDB}&language=es-ES`;
const url_trending = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY_TMDB}&language=es-ES`;
const url_series_valoradas = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY_TMDB}&language=es-ES`;
const url_series_comedia = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY_TMDB}&with_genres=35&language=es-ES&sort_by=popularity.desc&page=1`;
const url_series_drama = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY_TMDB}&with_genres=18&language=es-ES&sort_by=popularity.desc&page=1`;


async function Trending(){
  const response = await fetch(url_trending);
  if (!response.ok) throw new Error("Error al buscar");
  const datos = await response.json();
  return datos;
}

async function BuscarSeriesPopulares() {
  const response = await fetch(url_series_popular);
  if (!response.ok) throw new Error("Error al buscar las series mas populares.");
  const datos = await response.json();
  return datos;
}

async function BuscarSeriesMejorValoradas() {
  const response = await fetch(url_series_valoradas);
  if (!response.ok) throw new Error("Error al buscar las series mejor valoradas.");
  const datos = await response.json();
  return datos;
}

async function BuscarSeriesComedia() {
  const response = await fetch(url_series_comedia);
  if (!response.ok) throw new Error("Error al buscar series de comedia.");
  const datos = await response.json();
  return datos;
}

async function BuscarSeriesDrama() {
  const response = await fetch(url_series_drama);
  if (!response.ok) throw new Error("Error al buscar series de drama.");
  const datos = await response.json();
  return datos;
}

module.exports = {BuscarSeriesPopulares, Trending, BuscarSeriesMejorValoradas, BuscarSeriesDrama, BuscarSeriesComedia}