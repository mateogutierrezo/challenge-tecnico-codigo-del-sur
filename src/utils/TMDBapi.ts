import dotenv from 'dotenv';

dotenv.config();

let cachedMovies: any[] | null = null;

// Obtener películas de la API themoviedb
export const fetchMovies = async () => {
  const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1', {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      accept: 'application/json',
    },
  });

  const data = await response.json();
  cachedMovies = data.results;

  return cachedMovies || [];
}

// Valida que movieId pertenezca a una película de la API themoviedb
export const validateMovieId = async (movieId: number): Promise<boolean> => {
   if (!cachedMovies) {
    await fetchMovies();
  }

  return cachedMovies!.some((movie: any) => Number(movie.id) === movieId);
} 