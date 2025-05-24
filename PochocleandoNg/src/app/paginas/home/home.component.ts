import { Component, OnInit } from '@angular/core';
import { TarjetaComponent } from "../../componentes/tarjeta/tarjeta.component";
import { TmdbService } from '../../servicios/tmdb.service';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from '../../componentes/searchbar/searchbar.component';

@Component({
  selector: 'app-home',
  imports: [TarjetaComponent, CommonModule, SearchbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  peliculas: any[] = [];
  series: any[] = [];

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.tmdbService.getPelisPopulares().subscribe(data => {
      this.peliculas = data.results;
      console.log(this.peliculas);
    });

    this.tmdbService.getSeriesPopulares().subscribe(data => {
      this.series = data.results;
      console.log(this.series)
    })
  }
}
