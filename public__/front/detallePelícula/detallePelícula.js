document.addEventListener('DOMContentLoaded', async () => {
    try{
        const pelis = await fetch('/api/detalles');

        if (!pelis.ok) {
            throw new Error(`Error HTTP: ${pelis.status}`);
        }

        const data = await pelis.json();
        
        return mostrarDetallesPeli(data);
    }
    catch (error) {
        console.error('Error al cargar detalles:', error);
    }
    
});

function mostrarDetallesPeli(detalles){
    // 1. Verificar si el elemento existe
    const grid = document.getElementById("media-container");
    
    if (!grid) {
        console.error('Error: No se encontró el elemento con ID "media-container"');
        return; // Salir de la función si no existe
    }
    
    // 2. Limpiar el contenedor antes de agregar elementos
    grid.innerHTML = '';
    
    if (!detalles){
        console.error('No se recibió el elemento apropiado');
        return;
    }
    
    // 4. Crear elementos para cada película con validación
    const detallesElement = document.createElement('div');
    detallesElement.className = 'movie-card';
            
    // Validar datos antes de usarlos
    const posterPath = detalles.poster_path || '';
    const title = detalles.title || 'Título desconocido';
    const releaseYear = detalles.release_date ? detalles.release_date.split('-')[0] : 'N/A';
    const rating = detalles.vote_average ? detalles.vote_average.toFixed(1) : '0.0';
    const overview = detalles.overview;
            
    try{
        detallesElement.innerHTML = `
        <img src="${posterPath ? 'https://image.tmdb.org/t/p/w200' + posterPath : 'placeholder.jpg'}" 
            alt="${title}" 
            class="movie-poster"
            onerror="this.src='placeholder.jpg'">
                
            <div class="movie-info">
                <h3 class="movie-title">${title}</h3>
                <div class="movie-overview>${overview}</div>
                <div class="movie-meta">
                    <span>${releaseYear}</span>
                    <span class="movie-rating">
                        <i class="fas fa-star"></i>${rating}
                    </span>
                </div>
            </div>
        `;
            
        grid.appendChild(detallesElement);

    } catch (error) {
        console.error('Error al crear elemento de película:', error);
    }
}; 