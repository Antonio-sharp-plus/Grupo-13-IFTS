import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root', // Singleton para toda la app
})
export class ServicioBusqueda {
  // BehaviorSubject almacena el último valor emitido
  private terminoBusqueda = new BehaviorSubject<string>('');

  // Observable público al que los componentes se suscriben
  actualBusqueda$ = this.terminoBusqueda.pipe(
    debounceTime(300), // Espera 300ms entre búsquedas
    distinctUntilChanged(), // Evita repeticiones si el término no cambió
  );

  // Método para actualizar el término de búsqueda
  actualizarBusqueda(termino: string) {
    this.terminoBusqueda.next(termino);
  }
}