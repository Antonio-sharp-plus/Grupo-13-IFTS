import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TarjetaComponent } from '../../componentes/tarjeta/tarjeta.component';
import { SeriesService } from '../../servicios/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-series',
  imports: [CommonModule, TarjetaComponent, RouterModule],
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
    this.tituloSeccion = "Series Populares";

    for (let i = 0; i <= 3; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    this.seriesService.getSeriesPopulares().subscribe(data => this.datos = data);
  }

  async SeriesMejorValoradas(boton: number): Promise<void>{
    this.tituloSeccion = "Series Mejor Valoradas";

    for (let i = 0; i <= 3; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

   this.seriesService.getSeriesValoradas().subscribe(data => this.datos = data);
  }

  async SeriesComedia(boton: number): Promise<void>{
    this.tituloSeccion = "Series de Comedia";

    for (let i = 0; i <= 3; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    this.seriesService.getSeriesComedia().subscribe(data => this.datos = data);
  }

  async SeriesDrama(boton: number): Promise<void>{
    this.tituloSeccion = "Series de Drama";

    for (let i = 0; i <= 3; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

   this.seriesService.getSeriesDrama().subscribe(data => this.datos = data);
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


    this.seriesService.buscarSerie(nombre).subscribe(data => this.datos = data);
  }

}