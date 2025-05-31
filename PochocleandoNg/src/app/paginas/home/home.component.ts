import { Component, OnInit } from '@angular/core';
import { TarjetaComponent } from "../../componentes/tarjeta/tarjeta.component";
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  imports: [TarjetaComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  datos: any ;
  tituloSeccion = "Lo más popular"

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  async ngOnInit() {
    try{
      const response = await fetch('http://127.0.0.1:3000/api/trending');
      this.datos = await response.json()
      return console.log("Cargada la busqueda de lo mas popular");
    }
    catch(error){
      console.error("No se encontraron los datos", error);
      this.tituloSeccion = "Error en la búsqueda, intente más tarde.";
    }
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

    try{
      let url = `http://127.0.0.1:3000/api/buscar/${nombre}`;
      const response = await fetch(url);
      this.datos = await response.json()
      return console.log("Cargada la búsqueda de contenido");
    }
    catch(error){
      console.error("No se encontraron los datos", error);
      this.tituloSeccion = "Error en la búsqueda, intente más tarde.";
    }
  }

}