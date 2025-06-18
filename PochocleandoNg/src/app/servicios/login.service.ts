import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  token: string;
  usuario: any;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private userSubject = new BehaviorSubject<AuthResponse | null>(null);

  constructor(private http: HttpClient) {
  const token = localStorage.getItem('token');
  const usuario = localStorage.getItem('usuario');
  if (token && usuario) {
    this.userSubject.next({ token, usuario: JSON.parse(usuario) });
  }
}

  iniciarSesion(email: string, password: string): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
    .pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('usuario', JSON.stringify(response.usuario));
        this.userSubject.next(response);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): Observable<AuthResponse | null> {
    return this.userSubject.asObservable();
  }
  solicitarRecuperacion(email: string) {
  return this.http.post('http://localhost:3000/api/auth/forgot-password', { email });
}
}