import { Component, OnInit } from '@angular/core';
import { TarjetaComponent } from "../../componentes/tarjeta/tarjeta.component";
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

  constructor() {}

  ngOnInit(): void {
    
  }
}
