const API_KEY_TMDB = "4063bb0f4fe2de3c505e5c64207fbc3e";
const url_popular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_TMDB}&language=es-ES`;
const url_mejor_valoradas = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY_TMDB}&language=es-ES`;
const url_estrenos = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY_TMDB}&language=es-ES`;
const url_pelis_accion = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&with_genres=28&language=es-ES&sort_by=popularity.desc&page=1`;
const url_pelis_comedia = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&with_genres=35&language=es-ES&sort_by=popularity.desc&page=1`;
const url_pelis_drama = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&with_genres=18&language=es-ES&sort_by=popularity.desc&page=1`;
const url_pelis_cienciaficcion = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&with_genres=878&language=es-ES&sort_by=popularity.desc&page=1`;


async function BuscarPeliPorNombre(nombre) {
  const url_busqueda_nombre = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_TMDB}&query=${encodeURIComponent(nombre)}&language=es-ES`;
  const response = await fetch(url_busqueda_nombre);
  if (!response.ok) throw new Error("Error al buscar la película.");
  const peliDatos = await response.json();
  return peliDatos;
}

// Usar .then() y .catch()
/*
BuscarPeliPorNombre("El padrino")
  .then(resultado => console.log(JSON.stringify(resultado, null, 2)))
  .catch(error => console.error("Error:", error));

Código para mostrar el JSON en consola
*/

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
BuscarPelisPopulares()
  .then(datos => {
    console.log("Salió bien")
    redatos = datos.results;
    redatos.forEach(d => {
    console.log('titulo' + d.title)
});
  })
  .catch(error => console.error("Error:", error));
*/

//Código para mostrar JSON en consola


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


module.exports = {BuscarPeliPorNombre, BuscarPelisPopulares, BuscarDetallePeli, BuscarPelisMejorValoradas, BuscarEstrenos, BuscarPelisAccion, BuscarPelisComedia, BuscarPelisDrama, BuscarPelisCienciaFiccion}