import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// importo environment para que cambie automáticamente la url de la api dependiendo de si estoy buildeando para amplify o ejecutando simplemente en localhost
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ResenasService {

  constructor(private http: HttpClient) {}

  agregarResena(userId: string, resena: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/resenas/${userId}`, resena);
  }

  obtenerResenas(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/resenas/${userId}`);
  }

  editarResena(resenaId: string, comentario: string) {
  return this.http.put(`${environment.apiUrl}/resenas/${resenaId}`, { comentario });
}

  obtenerResenasPorContenido(contenidoId: string): Observable<any[]> {
  return this.http.get<any[]>(`${environment.apiUrl}/resenas/contenido/${contenidoId}`);
}

  eliminarResena(resenaId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/resenas/${resenaId}`);
  }
}