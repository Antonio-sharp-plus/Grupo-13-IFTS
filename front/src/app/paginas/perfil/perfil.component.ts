import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritosService } from '../../servicios/favoritos.service';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { TarjetaComponent } from '../../componentes/tarjeta/tarjeta.component';
import { ResenasService } from '../../servicios/resenas.service';
import { FormsModule } from '@angular/forms';
import { ApiGeneral, ApiService, SeriesService } from '../../servicios/api.service';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, TarjetaComponent, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit, OnDestroy {
  favoritos: any[] = [];
  userId: string = '';
  username: string = '';
  resenas: any[] = [];
  editandoResenaId: string | null = null;
  nuevoComentario: string = '';
  recomendados: any[] = [];
  cargandoRecomendaciones: boolean = false;
  private intervaloRecomendaciones: any;
  private idsUltimosRecomendados = new Set<string>();

  constructor(
    private favoritosService: FavoritosService,
    private loginService: LoginService,
    private router: Router,
    private resenasService: ResenasService,
    private apiGeneral: ApiGeneral,
    private apiPeliculas: ApiService,
    private seriesService: SeriesService
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.userId = user._id || user.id || '';
    this.username = user.username || '';
    this.resenasService.obtenerResenas(this.userId).subscribe(data => this.resenas = data);
    
    if (this.userId) {
      this.favoritosService.obtenerFavoritos(this.userId).subscribe(data => {
        this.favoritos = data;
        console.log('Favoritos:', this.favoritos);
        this.generarRecomendaciones();
        // refrescar cada 1 minuto, evitando repetir los del ciclo anterior
        if (this.intervaloRecomendaciones) clearInterval(this.intervaloRecomendaciones);
        this.intervaloRecomendaciones = setInterval(() => {
          this.generarRecomendaciones(true);
        }, 60 * 1000);
      });
    }
  }

  empezarEditarResena(resena: any) {
  this.editandoResenaId = resena._id;
  this.nuevoComentario = resena.comentario;
}

guardarEdicionResena(resena: any) {
  this.resenasService.editarResena(resena._id, this.nuevoComentario).subscribe({
    next: () => {
      this.resenas = this.resenas.map(r => {
        if (r._id === resena._id) {
          return { ...r, comentario: this.nuevoComentario };
        }
        return r;
      });
      this.editandoResenaId = null;
    },
    error: () => alert('Error al editar reseña')
  });
}

cancelarEdicion() {
  this.editandoResenaId = null;
}

  eliminarResena(resena: any) {
    this.resenasService.eliminarResena(resena._id).subscribe({
      next: () => {
        this.resenas = this.resenas.filter(r => r._id !== resena._id);
        alert('Reseña eliminada');
      },
      error: () => alert('Error al eliminar reseña')
    });
  }

  cerrarSesion() {
  this.loginService.logout();
  this.router.navigate(['']);
}

  ngOnDestroy(): void {
    if (this.intervaloRecomendaciones) {
      clearInterval(this.intervaloRecomendaciones);
      this.intervaloRecomendaciones = null;
    }
  }

  private async generarRecomendaciones(excluirUltimos: boolean = false) {
    this.cargandoRecomendaciones = true;
    try {
      const favoritosIds = new Set(this.favoritos.map(f => String(f.id)));
      const excluirIds = excluirUltimos ? this.idsUltimosRecomendados : new Set<string>();

      if (this.favoritos.length === 0) {
        const trending: any[] = await firstValueFrom(this.apiGeneral.getTrending());
        const seleccion = [] as any[];
        const vistos = new Set<string>();
        for (const item of this.shuffle(trending || []) as any[]) {
          const id = String((item as any).id);
          if (favoritosIds.has(id) || excluirIds.has(id) || vistos.has(id) || !(item as any).poster_path) continue;
          (item as any).tipo = (item as any).media_type;
          vistos.add(id);
          seleccion.push(item as any);
          if (seleccion.length >= 5) break;
        }
        this.recomendados = seleccion;
        this.idsUltimosRecomendados = new Set(this.recomendados.map((x: any) => String(x.id)));
        return;
      }

      const tipoCount: { movie: number; tv: number } = { movie: 0, tv: 0 };
      for (const fav of this.favoritos) {
        if (fav.tipo === 'movie') tipoCount.movie++;
        else if (fav.tipo === 'tv') tipoCount.tv++;
      }
      const tipoPrincipal: 'movie' | 'tv' = (tipoCount.movie >= tipoCount.tv) ? 'movie' : 'tv';

      const topGeneros = await this.obtenerTopGeneros(this.favoritos.slice(0, 12));
      const generoPrincipal = topGeneros[0];
      const generoSecundario = topGeneros[1];

      const cuotaPrincipal = 3; // al menos la mitad de 5
      const cuotaSecundaria = 2;

      const seleccion: any[] = [];
      const vistos = new Set<string>();

      const cuotaTotal = 5;

      // Construir pools por género (usando IDs de TMDB) priorizando el tipo principal
      const idsMoviePrincipal = this.mapearNombreAGeneroIds(generoPrincipal, 'movie');
      const idsTvPrincipal = this.mapearNombreAGeneroIds(generoPrincipal, 'tv');
      const idsMovieSec = this.mapearNombreAGeneroIds(generoSecundario, 'movie');
      const idsTvSec = this.mapearNombreAGeneroIds(generoSecundario, 'tv');

      const [pelisPop, pelisVal, seriesPop, seriesVal] = await Promise.all([
        firstValueFrom(this.apiPeliculas.getPeliculasPopulares()),
        firstValueFrom(this.apiPeliculas.getPeliculasMejorValoradas()),
        firstValueFrom(this.seriesService.getSeriesPopulares()),
        firstValueFrom(this.seriesService.getSeriesValoradas()),
      ]);

      const poolMoviePrincipal = this.shuffle(((pelisPop || []).concat(pelisVal || [])).map((x: any) => ({ ...x, tipo: 'movie' })))
        .filter((x: any) => this.contieneGeneroId(x, idsMoviePrincipal));
      const poolTvPrincipal = this.shuffle(((seriesPop || []).concat(seriesVal || [])).map((x: any) => ({ ...x, tipo: 'tv' })))
        .filter((x: any) => this.contieneGeneroId(x, idsTvPrincipal));

      const ordenarPorTipoPreferido = (arrA: any[], arrB: any[]) => tipoPrincipal === 'movie' ? [arrA, arrB] : [arrB, arrA];
      const [primero, segundo] = ordenarPorTipoPreferido(poolMoviePrincipal, poolTvPrincipal);

      // Tomar hasta 3 del género principal
      for (const pool of [primero, segundo]) {
        for (const item of pool) {
          if (seleccion.length >= cuotaPrincipal) break;
          const id = String(item.id);
          if (favoritosIds.has(id) || excluirIds.has(id) || vistos.has(id) || !item.poster_path) continue;
          vistos.add(id);
          seleccion.push(item);
        }
        if (seleccion.length >= cuotaPrincipal) break;
      }

      // Pools género secundario
      const poolMovieSec = this.shuffle(((pelisPop || []).concat(pelisVal || [])).map((x: any) => ({ ...x, tipo: 'movie' })))
        .filter((x: any) => this.contieneGeneroId(x, idsMovieSec));
      const poolTvSec = this.shuffle(((seriesPop || []).concat(seriesVal || [])).map((x: any) => ({ ...x, tipo: 'tv' })))
        .filter((x: any) => this.contieneGeneroId(x, idsTvSec));
      const [primSec, segSec] = ordenarPorTipoPreferido(poolMovieSec, poolTvSec);

      // Tomar hasta 2 del género secundario
      let tomadosSec = 0;
      for (const pool of [primSec, segSec]) {
        for (const item of pool) {
          if (tomadosSec >= cuotaSecundaria) break;
          const id = String(item.id);
          if (favoritosIds.has(id) || excluirIds.has(id) || vistos.has(id) || !item.poster_path) continue;
          vistos.add(id);
          seleccion.push(item);
          tomadosSec++;
        }
        if (tomadosSec >= cuotaSecundaria) break;
      }

      // Si aún faltan, completar con populares/valoradas priorizando el tipo principal
      const faltan = cuotaTotal - seleccion.length;
      if (faltan > 0) {
        const fallbackConsultas: Promise<any[]>[] = [];
        if (tipoPrincipal === 'movie') {
          fallbackConsultas.push(
            firstValueFrom(this.apiPeliculas.getPeliculasPopulares().pipe(map(arr => (arr || []).map((x: any) => ({ ...x, tipo: 'movie' }))))),
            firstValueFrom(this.apiPeliculas.getPeliculasMejorValoradas().pipe(map(arr => (arr || []).map((x: any) => ({ ...x, tipo: 'movie' }))))),
            firstValueFrom(this.seriesService.getSeriesPopulares().pipe(map(arr => (arr || []).map((x: any) => ({ ...x, tipo: 'tv' }))))),
            firstValueFrom(this.seriesService.getSeriesValoradas().pipe(map(arr => (arr || []).map((x: any) => ({ ...x, tipo: 'tv' }))))),
          );
        } else {
          fallbackConsultas.push(
            firstValueFrom(this.seriesService.getSeriesPopulares().pipe(map(arr => (arr || []).map((x: any) => ({ ...x, tipo: 'tv' }))))),
            firstValueFrom(this.seriesService.getSeriesValoradas().pipe(map(arr => (arr || []).map((x: any) => ({ ...x, tipo: 'tv' }))))),
            firstValueFrom(this.apiPeliculas.getPeliculasPopulares().pipe(map(arr => (arr || []).map((x: any) => ({ ...x, tipo: 'movie' }))))),
            firstValueFrom(this.apiPeliculas.getPeliculasMejorValoradas().pipe(map(arr => (arr || []).map((x: any) => ({ ...x, tipo: 'movie' }))))),
          );
        }
        const fallbackRes = await Promise.all(fallbackConsultas);
        for (const pool of fallbackRes) {
          for (const item of this.shuffle(pool)) {
            if (seleccion.length >= cuotaTotal) break;
            const id = String(item.id);
            if (favoritosIds.has(id)) continue;
            if (excluirIds.has(id)) continue;
            if (vistos.has(id)) continue;
            if (!item.poster_path) continue;
            vistos.add(id);
            seleccion.push(item);
          }
          if (seleccion.length >= cuotaTotal) break;
        }
      }

      this.recomendados = seleccion.slice(0, cuotaTotal);
      this.idsUltimosRecomendados = new Set(this.recomendados.map((x: any) => String(x.id)));
    } catch (e) {
      console.error('Error generando recomendaciones', e);
      this.recomendados = [];
    } finally {
      this.cargandoRecomendaciones = false;
    }
  }

  private async obtenerTopGeneros(favs: any[]): Promise<string[]> {
    const conteo: Record<string, number> = {};
    await Promise.all(
      favs.map(async f => {
        try {
          const det = await firstValueFrom(this.apiGeneral.BusquedaId(String(f.id), f.tipo));
          const generos = det?.genres || [];
          for (const g of generos) {
            const nombre = String(g.name || '').toLowerCase();
            if (!nombre) continue;
            conteo[nombre] = (conteo[nombre] || 0) + 1;
          }
        } catch {}
      })
    );
    return Object.entries(conteo)
      .sort((a, b) => b[1] - a[1])
      .map(([n]) => n);
  }

  private mapearGeneroACategoria(nombre: string, tipo: 'movie' | 'tv'): 'accion' | 'comedia' | 'drama' | 'scifi' | null {
    const n = nombre.toLowerCase();
    if (n.includes('action') || n.includes('acción') || n.includes('accion')) return 'accion';
    if (n.includes('comedy') || n.includes('comedia')) return 'comedia';
    if (n.includes('drama')) return 'drama';
    if (tipo === 'movie' && (n.includes('science') || n.includes('ciencia'))) return 'scifi';
    return null;
  }

  // Mapea nombre de género a IDs de TMDB por tipo
  private mapearNombreAGeneroIds(nombre?: string, tipo?: 'movie' | 'tv'): number[] {
    if (!nombre || !tipo) return [];
    const n = nombre.toLowerCase();
    const genresMovie: { [key: string]: number } = {
      action: 28,
      adventure: 12,
      animation: 16,
      comedy: 35,
      crime: 80,
      documentary: 99,
      drama: 18,
      family: 10751,
      fantasy: 14,
      history: 36,
      horror: 27,
      music: 10402,
      mystery: 9648,
      romance: 10749,
      scifi: 878,
      thriller: 53,
      war: 10752,
      western: 37
    };
    const genresTv: { [key: string]: number } = {
      action: 10759,
      animation: 16,
      comedy: 35,
      crime: 80,
      documentary: 99,
      drama: 18,
      family: 10751,
      kids: 10762,
      mystery: 9648,
      news: 10763,
      reality: 10764,
      scifi: 10765,
      soap: 10766,
      talk: 10767,
      war: 10768,
      western: 37
    };
    const pick = (keys: string[], dict: { [key: string]: number }) => keys.map(k => dict[k]).filter(Boolean);

    if (tipo === 'movie') {
      if (n.includes('acción') || n.includes('accion') || n.includes('action')) return [genresMovie['action']];
      if (n.includes('comedia') || n.includes('comedy')) return [genresMovie['comedy']];
      if (n.includes('drama')) return [genresMovie['drama']];
      if (n.includes('ciencia') || n.includes('science') || n.includes('ficción') || n.includes('ficcion')) return [genresMovie['scifi']];
      if (n.includes('terror') || n.includes('horror')) return [genresMovie['horror']];
      if (n.includes('misterio') || n.includes('mystery')) return [genresMovie['mystery']];
      if (n.includes('thriller') || n.includes('suspenso') || n.includes('suspense')) return [genresMovie['thriller']];
      if (n.includes('fantasy') || n.includes('fantasía') || n.includes('fantasia')) return [genresMovie['fantasy']];
      if (n.includes('romance') || n.includes('romántico') || n.includes('romantico')) return [genresMovie['romance']];
      return [];
    }

    if (tipo === 'tv') {
      if (n.includes('acción') || n.includes('accion') || n.includes('action')) return [genresTv['action']];
      if (n.includes('comedia') || n.includes('comedy')) return [genresTv['comedy']];
      if (n.includes('drama')) return [genresTv['drama']];
      if (n.includes('ciencia') || n.includes('science') || n.includes('ficción') || n.includes('ficcion')) return [genresTv['scifi']];
      if (n.includes('misterio') || n.includes('mystery')) return [genresTv['mystery']];
      // TV no tiene horror directo; suele ir por mystery/drama/scifi
      return [];
    }
    return [];
  }

  private contieneGeneroId(item: any, ids: number[]): boolean {
    if (!ids || ids.length === 0) return false;
    const lista: number[] = Array.isArray(item.genre_ids) ? item.genre_ids : [];
    return lista.some((g) => ids.includes(Number(g)));
  }

  private shuffle<T>(arr: T[]): T[] {
    const a = (arr || []).slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  private peliculasPorCategoria(cat: string) {
    switch (cat) {
      case 'accion':
        return this.apiPeliculas.getPeliculasAccion().pipe(map(arr => (arr || []).map((x: any) => ({ ...x, tipo: 'movie' }))));
      case 'comedia':
        return this.apiPeliculas.getPeliculasComedia().pipe(map(arr => (arr || []).map((x: any) => ({ ...x, tipo: 'movie' }))));
      case 'drama':
        return this.apiPeliculas.getPeliculasDrama().pipe(map(arr => (arr || []).map((x: any) => ({ ...x, tipo: 'movie' }))));
      case 'scifi':
        return this.apiPeliculas.getPeliculasSciFi().pipe(map(arr => (arr || []).map((x: any) => ({ ...x, tipo: 'movie' }))));
      default:
        return this.apiPeliculas.getPeliculasPopulares().pipe(map(arr => (arr || []).map((x: any) => ({ ...x, tipo: 'movie' }))));
    }
  }

  private seriesPorCategoria(cat: string) {
    switch (cat) {
      case 'comedia':
        return this.seriesService.getSeriesComedia().pipe(map(arr => (arr || []).map((x: any) => ({ ...x, tipo: 'tv' }))));
      case 'drama':
        return this.seriesService.getSeriesDrama().pipe(map(arr => (arr || []).map((x: any) => ({ ...x, tipo: 'tv' }))));
      default:
        return this.seriesService.getSeriesPopulares().pipe(map(arr => (arr || []).map((x: any) => ({ ...x, tipo: 'tv' }))));
    }
  }
}