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
  datos: any = { results: [] };
  tituloSeccion = "Lo más popular"

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  async ngOnInit() {
    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/trending');
      const jsonOriginal = await respuesta.json();
      this.datos = jsonOriginal.results;
      return this.datos;
    }
    catch(error){
      console.error("No se encontraron los datos", error);
      this.tituloSeccion = "Error en la búsqueda, intente más tarde.";
    }
  }

  async BuscarPeli(nombre: string): Promise<void>{
    
    
    if (nombre.length === 0) {
      console.log("Entró a la función");
      this.snackBar.open("Se debe introducir un nombre a la búsqueda", 'Cerrar', {
      duration: 5000,
      });
      return;
    }

    this.tituloSeccion = "";

    try{
      let url = "http://127.0.0.1:3000/api/busqueda/ambos/"
      let url_con_nombre = url + nombre;
      const respuesta = await fetch(url_con_nombre);
      const jsonOriginal = await respuesta.json();
      this.datos = jsonOriginal.results;
      return this.datos;
    }
    catch(error){
      console.error("No se encontraron los datos", error);
      this.tituloSeccion = "Error en la búsqueda, intente más tarde.";
    }
  }

}