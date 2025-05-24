import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = "4063bb0f4fe2de3c505e5c64207fbc3e";
  private urlBase = 'https://api.themoviedb.org/3';
  private lang = 'es-ES';

  constructor(private http: HttpClient) { }

  getPelisPopulares(): Observable<any> {
    const url = `${this.urlBase}/movie/popular?api_key=${this.apiKey}&language=${this.lang}`;
    return this.http.get(url)
  }

  getSeriesPopulares(): Observable<any> {
    const url = `${this.urlBase}/tv/popular?api_key=${this.apiKey}&language=${this.lang}`;
    return this.http.get(url)
  }

  getEstrenosPelis(): Observable<any> {
  const url = `${this.urlBase}/movie/upcoming?api_key=${this.apiKey}&language=${this.lang}`;
  return this.http.get<any>(url);
  }

  buscar(tipo: 'peliculas' | 'series' | 'ambos', termino: string) {
    
    let url = '';

    if (tipo === 'peliculas') {
    url = `${this.urlBase}/search/movie?query=${termino}&api_key=${this.apiKey}&language=${this.lang}`;
    } else if (tipo === 'series') {
    url = `${this.urlBase}/search/tv?query=${termino}&api_key=${this.apiKey}&language=${this.lang}`;
    } else {
    url = `${this.urlBase}/search/multi?query=${termino}&api_key=${this.apiKey}&language=${this.lang}`;
    }

    return this.http.get<any>(url).pipe(
      map((res: any) => res.results)
    );
  }
}
