import { getRandomSuggestionScore } from '../utils/random';
import { fetchMovies } from '../utils/TMDBapi';

export const getMoviesService = async (keyword?: string) => {
  let movies = await fetchMovies();

  let newMovies = movies.map((movie: any) => {
    const suggestionScore = getRandomSuggestionScore();
    return { ...movie, "suggestionScore": suggestionScore }
  })

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