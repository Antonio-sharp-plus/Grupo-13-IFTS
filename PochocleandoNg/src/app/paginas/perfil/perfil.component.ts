import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritosService } from '../../servicios/favoritos.service';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { TarjetaComponent } from '../../componentes/tarjeta/tarjeta.component';
import { ResenasService } from '../../servicios/resenas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, TarjetaComponent, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  favoritos: any[] = [];
  userId: string = '';
  username: string = '';
  resenas: any[] = [];
  editandoResenaId: string | null = null;
  nuevoComentario: string = '';

  constructor(
    private favoritosService: FavoritosService,
    private loginService: LoginService,
    private router: Router,
    private resenasService: ResenasService
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.userId = user._id || user.id || '';
    this.username = user.username || '';
    this.resenasService.obtenerResenas(this.userId).subscribe(data => this.resenas = data);
    
    if (this.userId) {
      this.favoritosService.obtenerFavoritos(this.userId).subscribe(data => {
        this.favoritos = data;
        console.log('Favoritos:', this.favoritos);
      });
    }
  }

  empezarEditarResena(resena: any) {
  this.editandoResenaId = resena._id;
  this.nuevoComentario = resena.comentario;
}

guardarEdicionResena(resena: any) {
  this.resenasService.editarResena(resena._id, this.nuevoComentario).subscribe({
    next: (r) => {
      resena.comentario = this.nuevoComentario;
      this.editandoResenaId = null;
    },
    error: () => alert('Error al editar reseña')
  });
}

cancelarEdicion() {
  this.editandoResenaId = null;
}

  cerrarSesion() {
  this.loginService.logout();
  this.router.navigate(['']);
}

}