import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

let url = "https://lmh0kk1foj.execute-api.us-east-1.amazonaws.com/demo";


@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private apiUrl = url + '/api/favoritos';

  constructor(private http: HttpClient) {}

  agregarFavorito(userId: string, favorito: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}`, { favorito });
  }

  obtenerFavoritos(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }
}