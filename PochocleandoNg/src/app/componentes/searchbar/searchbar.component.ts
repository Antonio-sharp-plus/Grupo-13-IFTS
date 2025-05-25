import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule, CommonModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent implements OnInit {

  @Input() tipo: 'peliculas' | 'series' | 'ambos' = 'ambos';
  @Output() resultados = new EventEmitter<any[]>();
  
  busqueda: string = '';
  sugerencias: any[] = [];

  // escucha los cambios en la búsqueda y los maneja con debounceTime
  private busquedaSubject = new Subject<string>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.busquedaSubject.pipe(
      debounceTime(300),
      switchMap(async (nombreBuscado) => this.http.get("http://localhost:4200/api/busqueda?tipo=${tipo}&termino=${nombreBuscado}"))
    ).subscribe((resultados) => {
      this.sugerencias = resultados.slice(0, 3); // sólo 3 sugerencias
      this.resultados.emit(this.sugerencias);
    });
  }

  onEscribir(): void {
    if (!this.busqueda.trim()) {
      this.sugerencias = [];
    }
    this.busquedaSubject.next(this.busqueda);
  }
}
