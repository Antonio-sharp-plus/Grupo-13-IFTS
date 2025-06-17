import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// importo environment para que cambie automáticamente la url de la api dependiendo de si estoy buildeando para amplify o ejecutando simplemente en localhost
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiGateway = environment.apiUrl + '/auth'

  constructor(private http: HttpClient) { }

  registrar(usuario: {email: string, password: string, username: string}): Observable<any> {
    return this.http.post(`${this.apiGateway}/registro`, usuario);
  }
}