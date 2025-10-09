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
  paginaActual: number = 1;
  totalPaginas: number = 10;
  categoriaActual: string = 'populares';
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
    this.PeliculasPopulares(0, 1);
  }

  async PeliculasPopulares(boton: number, page: number = 1): Promise<void>{
    this.tituloSeccion = "Películas populares";

    this.cambiarColorBoton(boton);

    this.categoriaActual = 'populares';
    this.paginaActual = page;

    this.apiService.getPeliculasPopulares(page).subscribe(data => this.datos = data);
  }

  async PeliculasMejorValoradas(boton: number, page: number = 1): Promise<void>{
    this.tituloSeccion = "Películas mejor valoradas";

    this.categoriaActual = 'valoradas';
    this.paginaActual = page;

    this.cambiarColorBoton(boton);

    this.apiService.getPeliculasMejorValoradas(page).subscribe(data => this.datos = data);
  }

  async PelisEstreno(boton: number, page: number = 1): Promise<void>{
    this.tituloSeccion = "Estrenos";

    this.categoriaActual = 'estrenos';
    this.paginaActual = page;

    this.cambiarColorBoton(boton);

    this.apiService.getPeliculasEstreno(page).subscribe(data => this.datos = data);
  }

  async PelisAccion(boton: number, page: number = 1): Promise<void>{
    this.tituloSeccion = "Películas de acción";

    this.categoriaActual = 'accion';
    this.paginaActual = page;

    this.cambiarColorBoton(boton);

    this.apiService.getPeliculasAccion(page).subscribe(data => this.datos = data);
  }

  async PeliculasComedia(boton: number, page: number = 1): Promise<void>{
    this.tituloSeccion = "Películas de comedia";

    this.categoriaActual = 'comedia';
    this.paginaActual = page;

    this.cambiarColorBoton(boton);

    this.apiService.getPeliculasComedia(page).subscribe(data => this.datos = data);
  }

  async PelisDrama(boton: number, page: number = 1): Promise<void>{
    this.tituloSeccion = "Películas de drama";

    this.categoriaActual = 'drama';
    this.paginaActual = page;

    this.cambiarColorBoton(boton);

    this.apiService.getPeliculasDrama(page).subscribe(data => this.datos = data);
  }

    async PelisCiencia(boton: number, page: number = 1): Promise<void>{
    this.tituloSeccion = "Películas de ciencia ficción";

    this.categoriaActual = 'ciencia';
    this.paginaActual = page;

    this.cambiarColorBoton(boton);

    this.apiService.getPeliculasSciFi(page).subscribe(data => this.datos = data);
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

  irAPagina(page: number) {
    if (page < 1 || page > this.totalPaginas) return;

    const botonActivo = this.botones.findIndex(b => b.includes('active'));

    switch(this.categoriaActual) {
      case 'populares':
        this.PeliculasPopulares(botonActivo, page);
        break;
      case 'valoradas':
        this.PeliculasMejorValoradas(botonActivo, page);
        break;
      case 'estrenos':
        this.PelisEstreno(botonActivo, page);
        break;
      case 'accion':
        this.PelisAccion(botonActivo, page);
        break;
      case 'comedia':
        this.PeliculasComedia(botonActivo, page);
        break;
      case 'drama':
        this.PelisDrama(botonActivo, page);
        break;
      case 'ciencia':
        this.PelisCiencia(botonActivo, page);
        break;
    }
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.irAPagina(this.paginaActual - 1);
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.irAPagina(this.paginaActual + 1);
    }
  }

}