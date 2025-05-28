import { Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { PeliculasComponent } from './paginas/peliculas/peliculas.component';
import { SeriesComponent } from './paginas/series/series.component';
import { AcercadeComponent } from './paginas/acercade/acercade.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // ruta principal
    { path: 'peliculas', component: PeliculasComponent },
    { path: 'series', component: SeriesComponent },
    { path: 'acercade', component: AcercadeComponent }
];
