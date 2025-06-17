import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// importo environment para que cambie automáticamente la url de la api dependiendo de si estoy buildeando para amplify o ejecutando simplemente en localhost
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FavoritosService {

  private apiGateway = environment.apiUrl + '/favoritos'

  constructor(private http: HttpClient) {}

  agregarFavorito(userId: string, favorito: any): Observable<any> {
    return this.http.post(`${this.apiGateway}/${userId}`, { favorito });
  }

  obtenerFavoritos(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiGateway}/${userId}`);
  }

  eliminarFavorito(userId: string, favoritoId: string): Observable<any> {
    return this.http.delete(`${this.apiGateway}/${userId}/${favoritoId}`);
  }
}