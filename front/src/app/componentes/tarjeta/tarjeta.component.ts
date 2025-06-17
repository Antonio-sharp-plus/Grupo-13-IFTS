import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tarjeta',
  imports: [CommonModule, RouterLink],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TarjetaComponent {
  @Input() titulo: string = '';
  @Input() anio: string | null = 'año desconocido';
  @Input() puntuacion: number = 0;
  @Input() poster: string = '';
  @Input() id: string = '';
  @Input() tipo: string = '';

  get link() {
    return `/detalles/${this.id}/${this.tipo}`;
  }
}
