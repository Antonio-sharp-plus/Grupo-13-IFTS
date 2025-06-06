import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiGeneral } from '../../servicios/api.service';
import { Subscription } from 'rxjs';
import { FavoritosService } from '../../servicios/favoritos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalle',
  imports: [CommonModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {
  data: any = {};
  private subscription?: Subscription;  // Para gestionar la desuscripción

  constructor(
    private route: ActivatedRoute, 
    private apiGeneral: ApiGeneral,
    private favoritosService: FavoritosService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const tipo = this.route.snapshot.params['tipo'];
    console.log(id, tipo)
    
    // Corrección: Asignar los datos dentro del subscribe
    this.subscription = this.apiGeneral.BusquedaId(id, tipo)
      .subscribe({
        next: (datos) => {
          this.data = datos;
          console.log('Datos recibidos:', this.data);
        },
        error: (err) => console.error('Error al cargar datos:', err)
      });
  }

  ngOnDestroy(): void {
    // Limpieza de la suscripción
    this.subscription?.unsubscribe();
  }

  
  agregarAFavoritos() {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    const userId = user._id || user.id || '';
    if (!userId) {
      this.snackBar.open('Debes iniciar sesión para agregar favoritos', 'Cerrar', { duration: 2000 });
      return;
    }
    const favorito = {
      id: this.data.id,
      titulo: this.data.title || this.data.name,
      poster: this.data.poster_path,
      anio: this.data.release_date || this.data.first_air_date,
      puntaje: this.data.vote_average
    };
    this.favoritosService.agregarFavorito(userId, favorito).subscribe({
      next: () => this.snackBar.open('¡Agregado a favoritos!', 'Cerrar', { duration: 2000 }),
      error: () => this.snackBar.open('Error al agregar a favoritos', 'Cerrar', { duration: 2000 })
    });
  }
}