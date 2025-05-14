const API_TMDB = "4063bb0f4fe2de3c505e5c64207fbc3e";

async function BuscarPorNombre(nombre) {
  const url_busqueda_nombre = `https://api.themoviedb.org/3/search/movie?api_key=${API_TMDB}&query=${encodeURIComponent(nombre)}&language=es-ES`;
  const response = await fetch(url_busqueda_nombre);
  if (!response.ok) throw new Error("Error al obtener los datos");
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