import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta',
  imports: [CommonModule],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css'
})
export class TarjetaComponent {
  @Input() titulo: string = '';
  @Input() anio: string | null = 'año desconocido';
  @Input() puntuacion: number = 0;
  @Input() poster: string = '';
}
