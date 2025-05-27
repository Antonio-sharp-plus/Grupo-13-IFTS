import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TarjetaComponent } from '../../componentes/tarjeta/tarjeta.component';

@Component({
  selector: 'app-series',
  imports: [CommonModule, TarjetaComponent],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent {

  datos: any = { results: [] };
  tituloSeccion = "Series populares";

  constructor(
    private snackBar: MatSnackBar, private dialog: MatDialog
  ) {}

  async ngOnInit() {
    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/series/populares');
      const jsonOriginal = await respuesta.json();
      this.datos = jsonOriginal.results;
      return this.datos;
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }

  botones = ["filter-btn active", "filter-btn", "filter-btn", "filter-btn", "filter-btn", "filter-btn", "filter-btn"]

  async SeriesPopulares(boton: number): Promise<void>{
    this.tituloSeccion = "Series Populares";

    for (let i = 0; i <= 3; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/series/populares');
      const jsonOriginal = await respuesta.json();
      this.datos = jsonOriginal.results.values();
      return this.datos;
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }

  async SeriesMejorValoradas(boton: number): Promise<void>{
    this.tituloSeccion = "Series Mejor Valoradas";

    for (let i = 0; i <= 3; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/series/masValoradas');
      const jsonOriginal = await respuesta.json();
      this.datos = jsonOriginal.results;
      return this.datos;
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }

  async SeriesComedia(boton: number): Promise<void>{
    this.tituloSeccion = "Series de Comedia";

    for (let i = 0; i <= 3; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/series/comedia');
      const jsonOriginal = await respuesta.json();
      this.datos = jsonOriginal.results;
      return this.datos;
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }

  async SeriesDrama(boton: number): Promise<void>{
    this.tituloSeccion = "Series de Drama";

    for (let i = 0; i <= 3; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/pelicula/drama');
      const jsonOriginal = await respuesta.json();
      this.datos = jsonOriginal.results;
      return this.datos;
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }
  async BuscarSeries(nombre: string): Promise<void>{
    
    
    if (nombre.length === 0) {
      console.log("Entró a la función de error snackbar");
      this.snackBar.open("Se debe introducir un nombre a la búsqueda", 'Cerrar', {
      duration: 5000,
      });
      return;
    }

    this.tituloSeccion = "";
    for (let i = 0; i <= 3; i++) {
      this.botones[i] = "filter-btn";
    }


    try{
      let url = "http://127.0.0.1:3000/api/busqueda/series/"
      let url_con_nombre = url + nombre;
      const respuesta = await fetch(url_con_nombre);
      const jsonOriginal = await respuesta.json();
      this.datos = jsonOriginal.results;
      return this.datos;
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }

}