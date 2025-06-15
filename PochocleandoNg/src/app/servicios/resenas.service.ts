import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResenasService {
  private apiUrl = 'http://localhost:3000/api/resenas';

  constructor(private http: HttpClient) {}

  agregarResena(userId: string, resena: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}`, resena);
  }

  obtenerResenas(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  editarResena(resenaId: string, comentario: string) {
  return this.http.put(`${this.apiUrl}/${resenaId}`, { comentario });
}

  obtenerResenasPorContenido(contenidoId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/contenido/${contenidoId}`);
}
}