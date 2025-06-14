import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritosService } from '../../servicios/favoritos.service';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { TarjetaComponent } from '../../componentes/tarjeta/tarjeta.component';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, TarjetaComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  favoritos: any[] = [];
  userId: string = '';
  username: string = '';

  constructor(
    private favoritosService: FavoritosService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.userId = user._id || user.id || '';
    this.username = user.username || '';

    if (this.userId) {
      this.favoritosService.obtenerFavoritos(this.userId).subscribe(data => {
        this.favoritos = data;
        console.log('Favoritos:', this.favoritos);
      });
    }
  }

  cerrarSesion() {
  this.loginService.logout();
  this.router.navigate(['']);
}

}