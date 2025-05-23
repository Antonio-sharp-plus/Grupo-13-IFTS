import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  datos: any = { results: [] };

  constructor(){}

  async ngOnInit() {
    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/pelicula/populares');
      const jsonOriginal = await respuesta.json();
      this.datos = jsonOriginal.results;
      return this.datos;
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }
  tituloDeContainer = "Películas Populares";
  

  botones = ["filter-btn active", "filter-btn", "filter-btn", "filter-btn", "filter-btn", "filter-btn", "filter-btn"]

  async PeliculasPopulares(boton: number): Promise<void>{
    this.tituloDeContainer = "Películas Populares";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/pelicula/populares');
      const jsonOriginal = await respuesta.json();
      this.datos = jsonOriginal.results.values();
      return this.datos;
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }

  async PeliculasMejorValoradas(boton: number): Promise<void>{
    this.tituloDeContainer = "Películas Mejor Valoradas";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/pelicula/masValoradas');
      const jsonOriginal = await respuesta.json();
      this.datos = jsonOriginal.results;
      return this.datos;
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }

  async PelisEstreno(boton: number): Promise<void>{
    this.tituloDeContainer = "Estrenos";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/pelicula/estrenos');
      const jsonOriginal = await respuesta.json();
      this.datos = jsonOriginal.results;
      return this.datos;
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }

  async PelisAccion(boton: number): Promise<void>{
    this.tituloDeContainer = "Películas de Acción";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/pelicula/accion');
      const jsonOriginal = await respuesta.json();
      this.datos = jsonOriginal.results;
      return this.datos;
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }

  async PeliculasComedia(boton: number): Promise<void>{
    this.tituloDeContainer = "Películas de Comedia";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/pelicula/comedia');
      const jsonOriginal = await respuesta.json();
      this.datos = jsonOriginal.results;
      return this.datos;
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }

  async PelisDrama(boton: number): Promise<void>{
    this.tituloDeContainer = "Películas de Drama";

    for (let i = 0; i <= 6; i++) {
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

  async PelisCiencia(boton: number): Promise<void>{
    this.tituloDeContainer = "Películas de Ciencia Ficción";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    try{
      const respuesta = await fetch('http://127.0.0.1:3000/api/pelicula/cienciaficcion');
      const jsonOriginal = await respuesta.json();
      this.datos = jsonOriginal.results;
      return this.datos;
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }
  /*
  async BuscarPeli(id: string): Promise<void>{
    this.tituloDeContainer = "";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }

    try{
      let url = "http://127.0.0.1:3000/api/pelicula/buscar/"
      let url_con_id = url + id;
      const respuesta = await fetch(url_con_id);
      const jsonOriginal = await respuesta.json();
      this.datos = jsonOriginal.results;
      return this.datos;
    }
    catch(error){
      console.error("No se encontraron los datos", error);
    }
  }
  */
}

