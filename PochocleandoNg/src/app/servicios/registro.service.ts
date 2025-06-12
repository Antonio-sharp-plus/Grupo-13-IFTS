import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

let url = "https://2zgk232198.execute-api.us-east-1.amazonaws.com/otra";

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