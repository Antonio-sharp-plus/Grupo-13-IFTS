// main.ts
import MovieCard from './movieCard';
import { Movie, Genre } from './interfaces';

const API_KEY = 'TU_API_KEY'; // Reemplaza con tu API key de TMDB

class MovieApp {
  private genreMap: Record<number, string> = {};

  async initialize() {
    try {
      await this.loadGenres();
      await this.displayPopularMovies();
    } catch (error) {
      console.error('Error initializing app:', error);
      this.showError();
    }
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  private async loadGenres(): Promise<void> {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es-MX`;
    const data = await this.fetchData<{ genres: Genre[] }>(url);
    
    this.genreMap = data.genres.reduce((map: Record<number, string>, genre) => {
      map[genre.id] = genre.name;
      return map;
    }, {});
  }

  private async getPopularMovies(): Promise<Movie[]> {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-MX&page=1`;
    const data = await this.fetchData<{ results: Movie[] }>(url);
    return data.results;
  }

  private showLoading(): void {
    const grid = document.querySelector('.movies-grid');
    if (grid) {
      grid.innerHTML = `
        <div class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
          <p>Cargando películas...</p>
        </div>
      `;
    }
  }

  private showError(message: string = 'Error al cargar las películas'): void {
    const grid = document.querySelector('.movies-grid');
    if (grid) {
      grid.innerHTML = `<p class="error-message">${message}</p>`;
    }
  }

  private clearGrid(): void {
    const grid = document.querySelector('.movies-grid');
    if (grid) {
      grid.innerHTML = '';
    }
  }

  private async displayPopularMovies(): Promise<void> {
    this.showLoading();
    
    try {
      const movies = await this.getPopularMovies();
      this.clearGrid();
      
      const grid = document.querySelector('.movies-grid');
      if (!grid) return;
      
      movies.forEach(movie => {
        const card = new MovieCard(movie, this.genreMap).render();
        card.addEventListener('click', () => this.showMovieDetails(movie.id));
        grid.appendChild(card);
      });
      
    } catch (error) {
      console.error('Error displaying movies:', error);
      this.showError('No se pudieron cargar las películas. Intenta nuevamente.');
    }
  }

  private showMovieDetails(movieId: number): void {
    // Implementar lógica para mostrar detalles de la película
    console.log('Mostrando detalles para película ID:', movieId);
    // window.location.href = `detalle.html?id=${movieId}`;
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const app = new MovieApp();
  app.initialize();
});