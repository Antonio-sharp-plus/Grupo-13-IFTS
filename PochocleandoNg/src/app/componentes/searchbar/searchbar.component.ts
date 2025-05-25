import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ServicioBusqueda } from '../../servicio-busqueda/servicio-busqueda.service';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule, CommonModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent implements OnInit {

  @Input() tipo: 'peliculas' | 'series' | 'ambos' = 'ambos';
  @Output() resultados = new EventEmitter<any[]>();
  
  busqueda: string = '';
  sugerencias: any[] = [];

  constructor(private servicioBusqueda: ServicioBusqueda) {}

  ngOnInit(): void {
  }

  onEscribir(): void {
    this.servicioBusqueda.actualizarBusqueda(this.busqueda);
  }
}
