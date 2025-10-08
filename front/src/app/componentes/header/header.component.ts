import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  usuario: any = null;
  menuActive: boolean = false; // Nueva propiedad para controlar el menú
  usarDislexia: boolean = false;

  constructor(private loginService: LoginService){
  }

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe((data) => {
      this.usuario = data?.usuario || null;
    });
  }

  // Método para abrir/cerrar el menú hamburguesa
  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }

  // Método para cerrar el menú (opcional, cuando haces click en un enlace)
  closeMenu(): void {
    this.menuActive = false;
  }

  toggleDislexia(): void {
    
    this.usarDislexia = !this.usarDislexia;

    if (this.usarDislexia) {
      document.body.classList.add('usar-dislexia');
    } else {
      document.body.classList.remove('usar-dislexia');
    }

  }

}