import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TarjetaComponent } from '../../componentes/tarjeta/tarjeta.component';
import { SeriesService } from '../../servicios/api.service';
import { RouterModule } from '@angular/router';
import { SearchbarComponent } from '../../componentes/searchbar/searchbar.component';

@Component({
  selector: 'app-series',
  imports: [CommonModule, TarjetaComponent, RouterModule, SearchbarComponent],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent implements OnInit{

  datos: any = [{}]; 
  tituloSeccion = "Series populares";
  tipo = 'tv';

  constructor(
    private snackBar: MatSnackBar, 
    private seriesService: SeriesService,
  ) {}

  async ngOnInit() {
    this.seriesService.getSeriesPopulares().subscribe(data => this.datos = data);
  }

  botones = ["filter-btn active", "filter-btn", "filter-btn", "filter-btn", "filter-btn", "filter-btn", "filter-btn"]

  async SeriesPopulares(boton: number): Promise<void>{
    this.tituloSeccion = "Series populares";

    for (let i = 0; i <= 3; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    this.seriesService.getSeriesPopulares().subscribe(data => this.datos = data);
  }

  async SeriesMejorValoradas(boton: number): Promise<void>{
    this.tituloSeccion = "Series mejor valoradas";

    for (let i = 0; i <= 3; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

   this.seriesService.getSeriesValoradas().subscribe(data => this.datos = data);
  }

  async SeriesComedia(boton: number): Promise<void>{
    this.tituloSeccion = "Series de comedia";

    for (let i = 0; i <= 3; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    this.seriesService.getSeriesComedia().subscribe(data => this.datos = data);
  }

  async SeriesDrama(boton: number): Promise<void>{
    this.tituloSeccion = "Series de drama";

    for (let i = 0; i <= 3; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

   this.seriesService.getSeriesDrama().subscribe(data => this.datos = data);
  }
  
  procesarResultados(resultados: any[]) {
    this.datos = resultados;
  }

  actualizarTituloBusqueda(busqueda: string): void {
    this.tituloSeccion = `Resultados para "${busqueda}"`;
  }

}