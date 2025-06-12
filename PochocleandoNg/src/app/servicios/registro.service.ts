import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'https://i7r6v5aa17.execute-api.us-east-1.amazonaws.com/demo/api/auth';

  constructor(private http: HttpClient) { }

  registrar(usuario: {email: string, password: string, username: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }
}