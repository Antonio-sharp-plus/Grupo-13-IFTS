import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TarjetaComponent } from '../../componentes/tarjeta/tarjeta.component';


@Component({
  selector: 'app-peliculas',
  imports: [ CommonModule, TarjetaComponent],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent implements OnInit{
  datos: any = [{}]
  tituloSeccion = "Películas populares";

  constructor(
    private snackBar: MatSnackBar, private dialog: MatDialog
  ) {}

  async ngOnInit() {
    try{
      const response = await fetch('http://127.0.0.1:3000/api/pelicula/populares');
      this.datos = await response.json()
      return console.log("Cargadas pelis populares");
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }

  botones = ["filter-btn active", "filter-btn", "filter-btn", "filter-btn", "filter-btn", "filter-btn", "filter-btn"]

  async PeliculasPopulares(boton: number): Promise<void>{
    this.tituloSeccion = "Películas Populares";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/pelicula/populares');
      this.datos = await respuesta.json();
      return console.log("Cargadas pelis populares");
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }

  async PeliculasMejorValoradas(boton: number): Promise<void>{
    this.tituloSeccion = "Películas Mejor Valoradas";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/pelicula/valoradas');
      this.datos = await respuesta.json();
      return console.log("Cargadas pelis valoradas");
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }

  async PelisEstreno(boton: number): Promise<void>{
    this.tituloSeccion = "Estrenos";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/pelicula/estrenos');
      this.datos = await respuesta.json();
      return console.log("Cargadas pelis estreno");
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }

  async PelisAccion(boton: number): Promise<void>{
    this.tituloSeccion = "Películas de Acción";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/pelicula/accion');
      this.datos = await respuesta.json();
      return console.log("Cargadas pelis accion");
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }

  async PeliculasComedia(boton: number): Promise<void>{
    this.tituloSeccion = "Películas de Comedia";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/pelicula/comedia');
      this.datos = await respuesta.json();
      return console.log("Cargadas pelis comedia");
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }

  async PelisDrama(boton: number): Promise<void>{
    this.tituloSeccion = "Películas de Drama";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/pelicula/drama');
      this.datos = await respuesta.json();
      return console.log("Cargadas pelis drama");
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }

  async PelisCiencia(boton: number): Promise<void>{
    this.tituloSeccion = "Películas de Ciencia Ficción";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/pelicula/scifi');
      this.datos = await respuesta.json();
      return console.log("Cargadas pelis scifi");
    }
    catch(error){
      console.error("No se encontraron los datos", error);
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
    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }

    try{
      let url = `http://127.0.0.1:3000/api/pelicula/buscar/${nombre}`;
      const respuesta = await fetch(url);
      this.datos = respuesta.json()
      return console.log("Cargadas busqueda de pelis");
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }

}