document.addEventListener('DOMContentLoaded', async () => {
    try{
        const pelis = await fetch('/api/peliculas');

        if (!pelis.ok) {
            throw new Error(`Error HTTP: ${pelis.status}`);
        }

        const data = await pelis.json();

        const listaDePelis = data.results || data || [];

        if (!Array.isArray(listaDePelis)){
            console.log("No es array");
            console.log(JSON.stringify(listaDePelis, null, 2))
            console.log(JSON.stringify(pelis, null, 2))
        }
        
        return mostrarPeliculas(listaDePelis);
    }
    catch (error) {
        console.error('Error al cargar películas:', error);
    }
    
});

function mostrarPeliculas(peliculas) {
    // 1. Verificar si el elemento existe
    const grid = document.getElementById("movies-grid");
    
    if (!grid) {
        console.error('Error: No se encontró el elemento con ID "movies-grid"');
        return; // Salir de la función si no existe
    }
    
    // 2. Limpiar el contenedor antes de agregar elementos
    grid.innerHTML = '';
    
    // 3. Verificar si hay películas para mostrar
    if (!peliculas || !Array.isArray(peliculas)) {
        grid.innerHTML = '<p class="error">No se encontraron películas</p>';
        return;
    }
    
    if (peliculas.length === 0) {
        grid.innerHTML = '<p>No hay películas disponibles</p>';
        return;
    }
    
    // 4. Crear elementos para cada película con validación
    peliculas.forEach(pelicula => {
        try {
            const peliculaElement = document.createElement('div');
            peliculaElement.className = 'movie-card';
            
            // Validar datos antes de usarlos
            const posterPath = pelicula.poster_path || '';
            const title = pelicula.title || 'Título desconocido';
            const releaseYear = pelicula.release_date ? pelicula.release_date.split('-')[0] : 'N/A';
            const rating = pelicula.vote_average ? pelicula.vote_average.toFixed(1) : '0.0';
            
            peliculaElement.innerHTML = `
                <img src="${posterPath ? 'https://image.tmdb.org/t/p/w200' + posterPath : 'placeholder.jpg'}" 
                     alt="${title}" 
                     class="movie-poster"
                     onerror="this.src='placeholder.jpg'">
                
                <div class="movie-info">
                    <h3 class="movie-title">${title}</h3>
                    <div class="movie-meta">
                        <span>${releaseYear}</span>
                        <span class="movie-rating">
                            <i class="fas fa-star"></i>${rating}
                        </span>
                    </div>
                </div>
            `;
            
            grid.appendChild(peliculaElement);
        } catch (error) {
            console.error('Error al crear elemento de película:', error);
        }
    });
}