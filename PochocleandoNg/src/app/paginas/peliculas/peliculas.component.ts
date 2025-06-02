import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TarjetaComponent } from '../../componentes/tarjeta/tarjeta.component';
import { ApiService } from '../../servicios/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-peliculas',
  imports: [ CommonModule, TarjetaComponent, RouterModule],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent implements OnInit{
  datos: any = [{}]
  tituloSeccion = "Películas populares";
  tipo = 'movie';

  constructor(
    private snackBar: MatSnackBar, 
    private apiService: ApiService,
  ) {}

  async ngOnInit() {
    this.datos = this.apiService.getPeliculasPopulares().subscribe(data => this.datos = data);
  }

  botones = ["filter-btn active", "filter-btn", "filter-btn", "filter-btn", "filter-btn", "filter-btn", "filter-btn"]

  async PeliculasPopulares(boton: number): Promise<void>{
    this.tituloSeccion = "Películas Populares";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    this.datos = this.apiService.getPeliculasPopulares().subscribe(data => this.datos = data);
  }

  async PeliculasMejorValoradas(boton: number): Promise<void>{
    this.tituloSeccion = "Películas Mejor Valoradas";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    this.datos = this.apiService.getPeliculasMejorValoradas().subscribe(data => this.datos = data);
  }

  async PelisEstreno(boton: number): Promise<void>{
    this.tituloSeccion = "Estrenos";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    this.apiService.getPeliculasEstreno().subscribe(data => this.datos = data);
  }

  async PelisAccion(boton: number): Promise<void>{
    this.tituloSeccion = "Películas de Acción";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    this.apiService.getPeliculasAccion().subscribe(data => this.datos = data);
  }

  async PeliculasComedia(boton: number): Promise<void>{
    this.tituloSeccion = "Películas de Comedia";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";
    this.apiService.getPeliculasComedia().subscribe(data => this.datos = data);
  }

  async PelisDrama(boton: number): Promise<void>{
    this.tituloSeccion = "Películas de Drama";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    this.apiService.getPeliculasDrama().subscribe(data => this.datos = data);
  }

    async PelisCiencia(boton: number): Promise<void>{
    this.tituloSeccion = "Películas de Ciencia Ficción";

    for (let i = 0; i <= 6; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    this.apiService.getPeliculasSciFi().subscribe(data => this.datos = data);
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



