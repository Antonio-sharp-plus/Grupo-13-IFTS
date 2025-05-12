// movieCard.ts
import { Movie, Genre } from './interfaces';

class MovieCard {
  private movie: Movie;
  private genres: Record<number, string>;

  constructor(movie: Movie, genres: Record<number, string> = {}) {
    this.movie = movie;
    this.genres = genres;
  }

  private getPosterUrl(): string {
    return this.movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
      : 'https://via.placeholder.com/500x750?text=Poster+No+Disponible';
  }

  private getReleaseYear(): string {
    return this.movie.release_date 
      ? this.movie.release_date.substring(0, 4) 
      : 'N/A';
  }

  private getGenres(): string {
    if (!this.movie.genre_ids || this.movie.genre_ids.length === 0) return '';
    
    return this.movie.genre_ids
      .map(id => this.genres[id])
      .filter(Boolean)
      .slice(0, 2)
      .join(', ');
  }

  public render(): HTMLElement {
    const card = document.createElement('div');
    card.className = 'movie-card';
    
    const genres = this.getGenres();
    
    card.innerHTML = `
      <img src="${this.getPosterUrl()}" alt="${this.movie.title}" class="movie-poster">
      <div class="movie-info">
        <h3 class="movie-title">${this.movie.title}</h3>
        <div class="movie-meta">
          <span>${this.getReleaseYear()}</span>
          <span class="movie-rating">
            <i class="fas fa-star"></i> ${this.movie.vote_average.toFixed(1)}
          </span>
        </div>
        ${genres ? `<p class="movie-genres">${genres}</p>` : ''}
      </div>
    `;
    
    return card;
  }
}

export default MovieCard;