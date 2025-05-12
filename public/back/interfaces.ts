// interfaces.ts
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids?: number[];
  overview?: string;
}

export interface Genre {
  id: number;
  name: string;
}