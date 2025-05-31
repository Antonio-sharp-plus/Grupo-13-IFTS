import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.themoviedb.org/3'; //url api

  constructor(private http: HttpClient) {}

  // obtener peli
  getPeliculas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/peliculas`);
  }

  // obtener detalle de peli 
  getPelicula(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/peliculas/${id}`);
  }

  // agregar peli
  addPelicula(pelicula: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/peliculas`, pelicula);
  }

  // actualizar peli
  updatePelicula(id: string, pelicula: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/peliculas/${id}`, pelicula);
  }

  // eliminar peli
  deletePelicula(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/peliculas/${id}`);
  }
}
