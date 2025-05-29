import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  registrar(usuario: {email: string, password: string, username: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }
}