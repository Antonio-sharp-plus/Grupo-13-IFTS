import { Component, OnInit } from '@angular/core';
import { TarjetaComponent } from "../../componentes/tarjeta/tarjeta.component";
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiGeneral } from '../../servicios/api.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [TarjetaComponent, CommonModule, RouterModule],
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

  async BuscarPeli(nombre: string): Promise<void>{
    
    
    if (nombre.length === 0) {
      console.log("Búsqueda vacía");
      this.snackBar.open("Se debe introducir un nombre a la búsqueda", 'Cerrar', {
      duration: 5000,
      });
      return;
    }

    this.tituloSeccion = "";

    this.apiGeneral.BusquedaGeneral(nombre).subscribe(data => this.datos = data);
  }

}