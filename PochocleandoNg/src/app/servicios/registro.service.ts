import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

let url = "https://lmh0kk1foj.execute-api.us-east-1.amazonaws.com/demo";

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = url + '/api/auth';

  constructor(private http: HttpClient) { }

  registrar(usuario: {email: string, password: string, username: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }
}