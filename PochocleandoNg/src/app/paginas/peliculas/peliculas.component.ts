import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../servicios/tmdb.service';
import { TarjetaComponent } from '../../componentes/tarjeta/tarjeta.component';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from '../../componentes/searchbar/searchbar.component';

@Component({
  selector: 'app-peliculas',
  imports: [TarjetaComponent, CommonModule, SearchbarComponent],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent {
  peliculas: any[] = [];

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.tmdbService.getEstrenosPelis().subscribe(data => {
      this.peliculas = data.results;
      console.log(this.peliculas);
    });
  }
}
