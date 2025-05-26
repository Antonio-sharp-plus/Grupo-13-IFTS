import { Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { PeliculasComponent } from './paginas/peliculas/peliculas.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // ruta principal
    { path: 'peliculas', component: PeliculasComponent},
];
