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
  mostrarRecuperar = false;
  emailRecuperar: string = '';

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
          this.isLoading = false;
          this.error = 'Error al iniciar sesión';
          this.snackBar.open('Error al iniciar sesión', 'Cerrar', { duration: 2000 });
          console.error(err);
        }
      });
  }
  enviarRecuperacion() {
  this.loginService.solicitarRecuperacion(this.emailRecuperar).subscribe({
    next: (res) => {
      this.snackBar.open('Revisá tu correo para restablecer tu contraseña.', 'Cerrar', { duration: 3000 });
      this.mostrarRecuperar = false;
    },
    error: (err) => {
      this.snackBar.open('Error al enviar el correo. Verificá el email.', 'Cerrar', { duration: 3000 });
      console.error(err);
    }
  });
}
}