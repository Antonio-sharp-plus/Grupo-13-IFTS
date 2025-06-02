import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiGeneral } from '../../servicios/api.service';
import { Subscription } from 'rxjs';

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
    private apiGeneral: ApiGeneral
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
}