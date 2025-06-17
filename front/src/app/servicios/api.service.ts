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
  getPeliculasPopulares(): Observable<any> {
    return this.http.get(`${this.apiGateway}/populares`);
  }

  // filtro: BUSCAR POR NOMBRE
  buscarPelicula(nombre: string): Observable<any> {
    console.log(`api.service.ts recibió ${nombre}`)
    return this.http.get(`${this.apiGateway}/buscar/${nombre}`);
  }

  // filtro: ACCIÓN
  getPeliculasAccion(): Observable<any> {
    return this.http.get(`${this.apiGateway}/accion`);
  }

  // filtro: COMEDIA
  getPeliculasComedia(): Observable<any> {
    return this.http.get(`${this.apiGateway}/comedia`);
  }

  // filtro: DRAMA
  getPeliculasDrama(): Observable<any> {
    return this.http.get(`${this.apiGateway}/drama`);
  }

  // filtro: CIENCIA FICCIÓN
  getPeliculasSciFi(): Observable<any> {
    return this.http.get(`${this.apiGateway}/scifi`);
  }
  // filtro: ESTRENOS
  getPeliculasEstreno(): Observable<any> {
    return this.http.get(`${this.apiGateway}/estrenos`);
  }

  // filtro: MEJOR VALORADAS
  getPeliculasMejorValoradas(): Observable<any> {
    return this.http.get(`${this.apiGateway}/valoradas`);
  } 

}

//servicio para series
@Injectable({ providedIn: 'root' })
export class SeriesService {

  private apiGateway = environment.apiUrl + '/series';

  constructor(private http: HttpClient) {}

  // filtro: SERIES VALORADAS
  getSeriesValoradas(): Observable<any> {
    return this.http.get(`${this.apiGateway}/valoradas`);
  }

  // filtro: SERIES COMEDIA
  getSeriesComedia(): Observable<any> {
    return this.http.get(`${this.apiGateway}/comedia`);
  }

  // filtro: SERIES DRAMA
  getSeriesDrama(): Observable<any> {
    return this.http.get(`${this.apiGateway}/drama`);
  }

  // filtro: SERIES DRAMA
  getSeriesPopulares(): Observable<any> {
    return this.http.get(`${this.apiGateway}/populares`);
  }

   // filtro: BUSCAR POR NOMBRE
  buscarSerie(nombre: string): Observable<any> {
    return this.http.get(`${this.apiGateway}/buscar/${nombre}`);
  }
  
}