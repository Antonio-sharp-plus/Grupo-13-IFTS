const API_KEY_TMDB = "4063bb0f4fe2de3c505e5c64207fbc3e";
const url_series_popular = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY_TMDB}&language=es-ES`;
const url_trending = "https://api.themoviedb.org/3/trending/all/week"

async function Trending(){
  const response = await fetch(url_trending);
  if (!response.ok) throw new Error("Error al buscar");
  const datos = await response.json();
  return datos;
}

async function BuscarSeriesPopulares() {
  const response = await fetch(url_series_popular);
  if (!response.ok) throw new Error("Error al buscar la película.");
  const datos = await response.json();
  return datos;
}

module.exports = {BuscarSeriesPopulares, Trending}