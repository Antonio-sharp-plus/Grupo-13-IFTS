const API_KEY_TMDB = "4063bb0f4fe2de3c505e5c64207fbc3e";
const url_series_popular = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY_TMDB}&language=es-ES`;

async function BuscarSeriesPopulares() {
  const response = await fetch(url_series_popular);
  if (!response.ok) throw new Error("Error al buscar la película.");
  const peliDatos = await response.json();
  return peliDatos;
}

module.exports = {BuscarSeriesPopulares}