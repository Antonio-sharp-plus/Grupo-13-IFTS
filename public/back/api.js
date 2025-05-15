const API_KEY_TMDB = "4063bb0f4fe2de3c505e5c64207fbc3e";
const url_popular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_TMDB}&language=es-ES&region=ES`;

async function BuscarPeliPorNombre(nombre) {
  const url_busqueda_nombre = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_TMDB}&query=${encodeURIComponent(nombre)}&language=es-ES`;
  const response = await fetch(url_busqueda_nombre);
  if (!response.ok) throw new Error("Error al buscar la película.");
  const peliDatos = await response.json();
  return peliDatos;
}

// Usar .then() y .catch()
/*
BuscarPorNombre("El padrino")
  .then(resultado => console.log(JSON.stringify(resultado, null, 2)))
  .catch(error => console.error("Error:", error));

Código para mostrar el JSON en consola
*/

async function BuscarPelisPopulares(){
    try
    {
        const response = await fetch(url_popular);
        const pelisPopulares = await response.json();
        return pelisPopulares
    }
    catch
    {
        throw new Error("Error al obtener películas populares.")
    }
}

/*
BuscarPopulares()
  .then(resultado => console.log(JSON.stringify(resultado, null, 2)))
  .catch(error => console.error("Error:", error));

Código para mostrar JSON en consola
*/