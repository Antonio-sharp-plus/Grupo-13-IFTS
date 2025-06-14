import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegistroService } from '../../servicios/registro.service';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  email: string = '';
  password: string = '';
  username: string = '';
  error: string = '';

  constructor(
    private registroService: RegistroService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onSubmit(): void {
    this.registroService.registrar({ email: this.email, password: this.password, username: this.username })
      .subscribe({
        next: () => {
          this.snackBar.open('¡Registro exitoso!', 'Cerrar', { duration: 1500 });
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => {
          this.error = 'Error al registrarse';
          this.snackBar.open('Error al registrarse', 'Cerrar', { duration: 1500 });
          console.error(err);
        }
      });
  }
}