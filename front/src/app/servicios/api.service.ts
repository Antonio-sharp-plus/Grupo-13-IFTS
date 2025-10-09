import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// importo environment para que cambie automáticamente la url de la api dependiendo de si estoy buildeando para amplify o ejecutando simplemente en localhost
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiGeneral{

  constructor(private http: HttpClient) {}

  getTrending(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/trending`);
  }

  BusquedaGeneral(nombre: string): Observable<any>{
    return this.http.get(`${environment.apiUrl}/buscar/${nombre}`);
  }

  BusquedaId(id: string, tipo: string): Observable<any>{
    return this.http.get(`${environment.apiUrl}/buscarid/${id}/${tipo}`);
  }
}

// Servicio para peliculas
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiGateway = environment.apiUrl + '/pelicula';

  constructor(private http: HttpClient) {}

  // filtro: POPULARES
  getPeliculasPopulares(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiGateway}/populares?page=${page}`);
  }

  // filtro: BUSCAR POR NOMBRE
  buscarPelicula(nombre: string): Observable<any> {
    console.log(`api.service.ts recibió ${nombre}`)
    return this.http.get(`${this.apiGateway}/buscar/${nombre}`);
  }

  // filtro: ACCIÓN
  getPeliculasAccion(page: number): Observable<any> {
    return this.http.get(`${this.apiGateway}/accion?page=${page}`);
  }

  // filtro: COMEDIA
  getPeliculasComedia(page: number): Observable<any> {
    return this.http.get(`${this.apiGateway}/comedia?page=${page}`);
  }

  // filtro: DRAMA
  getPeliculasDrama(page: number): Observable<any> {
    return this.http.get(`${this.apiGateway}/drama?page=${page}`);
  }

  // filtro: CIENCIA FICCIÓN
  getPeliculasSciFi(page: number): Observable<any> {
    return this.http.get(`${this.apiGateway}/scifi?page=${page}`);
  }
  // filtro: ESTRENOS
  getPeliculasEstreno(page: number): Observable<any> {
    return this.http.get(`${this.apiGateway}/estrenos?page=${page}`);
  }

  // filtro: MEJOR VALORADAS
  getPeliculasMejorValoradas(page: number): Observable<any> {
    return this.http.get(`${this.apiGateway}/valoradas?page=${page}`);
  } 

}

//servicio para series
@Injectable({ providedIn: 'root' })
export class SeriesService {

  private apiGateway = environment.apiUrl + '/series';

  constructor(private http: HttpClient) {}

  // filtro: SERIES VALORADAS
  getSeriesValoradas(page: number): Observable<any> {
    return this.http.get(`${this.apiGateway}/valoradas?page=${page}`);
  }

  // filtro: SERIES COMEDIA
  getSeriesComedia(page: number): Observable<any> {
    return this.http.get(`${this.apiGateway}/comedia?page=${page}`);
  }

  // filtro: SERIES DRAMA
  getSeriesDrama(page: number): Observable<any> {
    return this.http.get(`${this.apiGateway}/drama?page=${page}`);
  }

  // filtro: SERIES DRAMA
  getSeriesPopulares(page: number): Observable<any> {
    return this.http.get(`${this.apiGateway}/populares?page=${page}`);
  }

   // filtro: BUSCAR POR NOMBRE
  buscarSerie(nombre: string): Observable<any> {
    return this.http.get(`${this.apiGateway}/buscar/${nombre}`);
  }
  
}