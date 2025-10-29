export interface FavoriteEntry {
  movieId: number;
  addedAt: string; 
}

export type Favorites = Record<string, FavoriteEntry[]>;