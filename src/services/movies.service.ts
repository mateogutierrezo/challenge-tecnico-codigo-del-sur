import { getRandomSuggestionScore } from '../utils/random';
import { fetchMovies } from '../utils/TMDBapi';

// Obtener las pelícuaolas de la api themoviedb
export const getMoviesService = async (keyword?: string) => {
  let movies = await fetchMovies();

  // a cada película se le agrega suggestionScore
  let newMovies = movies.map((movie: any) => {
    const suggestionScore = getRandomSuggestionScore();
    return { ...movie, "suggestionScore": suggestionScore }
  })

  // ordenar las películas según su suggestionScore
  newMovies.sort((a: any, b: any) => b.suggestionScore - a.suggestionScore)


  // Si hay keyword, se filtran las películas
  if (keyword) {
    const lowerKeyword = keyword.toLowerCase();
    newMovies = newMovies.filter(
      (movie: any) =>
        movie.title.toLowerCase().includes(lowerKeyword) ||
        movie.original_title.toLowerCase().includes(lowerKeyword) ||
        movie.overview.toLowerCase().includes(lowerKeyword)
    );
  }

  return newMovies;
}