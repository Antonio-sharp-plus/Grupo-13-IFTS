import { Component, OnInit } from '@angular/core';
import { TarjetaComponent } from "../../componentes/tarjeta/tarjeta.component";
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiGeneral } from '../../servicios/api.service';
import { RouterModule } from '@angular/router';
import { SearchbarComponent } from '../../componentes/searchbar/searchbar.component';


@Component({
  selector: 'app-home',
  imports: [TarjetaComponent, CommonModule, RouterModule, SearchbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  datos: any = [{}];
  tituloSeccion = "Lo más popular"

  constructor(
    private snackBar: MatSnackBar, 
    private apiGeneral: ApiGeneral, 
  ) {}

  async ngOnInit() {
    this.apiGeneral.getTrending().subscribe(data => this.datos = data);
  }

  procesarResultados(resultados: any[]) {
    this.datos = resultados;
  }

  actualizarTituloBusqueda(busqueda: string): void {
    this.tituloSeccion = `Resultados para "${busqueda}"`;
  }

}