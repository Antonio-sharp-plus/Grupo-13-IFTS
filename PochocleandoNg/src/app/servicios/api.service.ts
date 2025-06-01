import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Servicio para peliculas


export class ApiService {
  private apiUrl = 'http://localhost:3000/api/pelicula'; 

  constructor(private http: HttpClient) {}

  // filtro: POPULARES
  getPeliculasPopulares(): Observable<any> {
    return this.http.get(`${this.apiUrl}/populares`);
  }

  // filtro: BUSCAR POR NOMBRE
  buscarPeliculas(nombre: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/buscar/${nombre}`);
  }

  // filtro: ACCIÓN
  getPeliculasAccion(): Observable<any> {
    return this.http.get(`${this.apiUrl}/accion`);
  }

  // filtro: COMEDIA
  getPeliculasComedia(): Observable<any> {
    return this.http.get(`${this.apiUrl}/comedia`);
  }

  // filtro: DRAMA
  getPeliculasDrama(): Observable<any> {
    return this.http.get(`${this.apiUrl}/drama`);
  }

  // filtro: CIENCIA FICCIÓN
  getPeliculasSciFi(): Observable<any> {
    return this.http.get(`${this.apiUrl}/scifi`);
  }
  // filtro: ESTRENOS
  getPeliculasEstreno(): Observable<any> {
    return this.http.get(`${this.apiUrl}/estrenos`);
  }

  // filtro: MEJOR VALORADAS
  getPeliculasMejorValoradas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/valoradas`);
  } 

}

//servicio para series

export class SeriesService {
  private apiUrl = 'http://localhost:3000/api/series';

  constructor(private http: HttpClient) {}

  // filtro: SERIES VALORADAS
  getSeriesValoradas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/valoradas`);
  }

  // filtro: SERIES COMEDIA
  getSeriesComedia(): Observable<any> {
    return this.http.get(`${this.apiUrl}/comedia`);
  }

  // filtro: SERIES DRAMA
  getSeriesDrama(): Observable<any> {
    return this.http.get(`${this.apiUrl}/drama`);
  }

  // filtro: SERIES DRAMA
  getSeriesPopulares(): Observable<any> {
    return this.http.get(`${this.apiUrl}/populares`);
  }

   // filtro: BUSCAR POR NOMBRE
  buscarSerie(nombre: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/buscar/${nombre}`);
  }
}