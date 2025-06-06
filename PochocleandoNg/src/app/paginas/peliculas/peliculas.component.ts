import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TarjetaComponent } from '../../componentes/tarjeta/tarjeta.component';
import { ApiService } from '../../servicios/api.service';
import { RouterModule } from '@angular/router';
import { SearchbarComponent } from '../../componentes/searchbar/searchbar.component';

@Component({
  selector: 'app-peliculas',
  imports: [ CommonModule, TarjetaComponent, RouterModule, SearchbarComponent],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent implements OnInit{

  datos: any[] = [];
  tituloSeccion = "Películas populares";
  tipo = 'movie';
  botones = [
      "filter-btn active", 
      "filter-btn", 
      "filter-btn", 
      "filter-btn", 
      "filter-btn", 
      "filter-btn", 
      "filter-btn"]

  constructor(
    private snackBar: MatSnackBar, 
    private apiService: ApiService,
  ) {}

  async ngOnInit() {
    this.PeliculasPopulares(0);
  }

  async PeliculasPopulares(boton: number): Promise<void>{
    this.tituloSeccion = "Películas populares";

    this.cambiarColorBoton(boton);

    this.apiService.getPeliculasPopulares().subscribe((data) => {
      this.datos = data;
    });
  }

  async PeliculasMejorValoradas(boton: number): Promise<void>{
    this.tituloSeccion = "Películas mejor valoradas";

    this.cambiarColorBoton(boton);

    this.apiService.getPeliculasMejorValoradas().subscribe((data) => (this.datos = data));
  }

  async PelisEstreno(boton: number): Promise<void>{
    this.tituloSeccion = "Estrenos";

    this.cambiarColorBoton(boton);

    this.apiService.getPeliculasEstreno().subscribe(data => this.datos = data);
  }

  async PelisAccion(boton: number): Promise<void>{
    this.tituloSeccion = "Películas de acción";

    this.cambiarColorBoton(boton);

    this.apiService.getPeliculasAccion().subscribe(data => this.datos = data);
  }

  async PeliculasComedia(boton: number): Promise<void>{
    this.tituloSeccion = "Películas de comedia";

    this.cambiarColorBoton(boton);

    this.apiService.getPeliculasComedia().subscribe(data => this.datos = data);
  }

  async PelisDrama(boton: number): Promise<void>{
    this.tituloSeccion = "Películas de drama";

    this.cambiarColorBoton(boton);

    this.apiService.getPeliculasDrama().subscribe(data => this.datos = data);
  }

    async PelisCiencia(boton: number): Promise<void>{
    this.tituloSeccion = "Películas de ciencia ficción";

    this.cambiarColorBoton(boton);

    this.apiService.getPeliculasSciFi().subscribe(data => this.datos = data);
  }

  cambiarColorBoton(boton: number): void {
    for (let i = 0; i <= 6; i++) {
      this.botones[i] = 'filter-btn';
    }
    this.botones[boton] = 'filter-btn active';
  }
  
  procesarResultados(resultados: any[]) {
    this.datos = resultados;
  }

  actualizarTituloBusqueda(busqueda: string): void {
    this.tituloSeccion = `Resultados para "${busqueda}"`;
  }

}