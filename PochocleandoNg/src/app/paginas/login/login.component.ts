import { Component } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, RouterLink]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  isLoading: boolean = false; //pantalla de carga

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onSubmit(): void {
    this.isLoading = true;

    this.loginService.iniciarSesion(this.email, this.password)
      .subscribe({
        next: () => {
          this.snackBar.open('¡Login exitoso!', 'Cerrar', { duration: 2000 });
          setTimeout(() => this.router.navigate(['/']), 2000);
        },
        error: (err) => {
          this.error = 'Error al iniciar sesión';
          this.snackBar.open('Error al iniciar sesión', 'Cerrar', { duration: 2000 });
          console.error(err);
        }
      });
  }
}