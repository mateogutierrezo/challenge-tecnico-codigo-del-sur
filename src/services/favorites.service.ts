import fs from 'fs/promises';
import path from 'path';
import { Favorites } from '../types/Favorites';
import { fetchMovies, validateMovieId } from '../utils/TMDBapi';
import { getCurrentDate } from '../utils/date';
import { getRandomSuggestionScoreForToday } from '../utils/random';

const FAVORITES_FILE = path.join(__dirname, '../../data/favorites.json');

// Leer favoritos de favorites.json
const readFavorites = async (): Promise<Favorites> => {
  try {
    const data = await fs.readFile(FAVORITES_FILE, 'utf-8').catch(() => '{}');
    return JSON.parse(data) as Favorites;
  } catch (err) {
    console.error('Error reading favorites.json:', err);
    throw err;
  }
};

// Agregar a favoritos en favorites.json
const writeFavorites = async (favorites: Favorites) => {
  try {
    await fs.writeFile(FAVORITES_FILE, JSON.stringify(favorites, null, 2));
  } catch (err) {
    console.error('Error writing favorites.json:', err);
    throw err;
  }
};


export const addToFavoritesService = async (userId: string, movieId: number) => {

  // validar qie userId pertenezca a una película
  const validId = await validateMovieId(movieId);
  if (!validId) throw new Error('Invalid movieId')
  
  const favorites = await readFavorites();

  // si el usuario no tiene favoritos aún, se agrega una nueva entrada con su id
  if (!favorites[userId]) {
    favorites[userId] = [];
  }

  const userFavorites = favorites[userId];
  
  // si la película no se encuentra en los favoritos del usuario se agrega.
  if (!userFavorites.some(favorite => favorite.movieId === movieId)) {
    userFavorites.push({
      movieId,
      addedAt: getCurrentDate()
    });
  } else {
    throw new Error(`Movie ${movieId} already in favorites`)
  }

  await writeFavorites(favorites);
  return { message: `Movie ${movieId} successfully added to favorites` };
}

export const getFavoritesService = async (userId: string) => {
  const favorites = await readFavorites();
  
  const userFavorites = favorites[userId];

  if (!userFavorites) throw new Error("Don't have favorites yet");

  const movies = await fetchMovies();

  let favoritesInfo = userFavorites.map((fav) => {
    const movie = movies.find(m => m.id === fav.movieId);
    if (!movie) return null;
    return {
      ...movie,
      addedAt: fav.addedAt,
      suggestionForToday: getRandomSuggestionScoreForToday(movie.id)

    };
  }).filter(Boolean);

  favoritesInfo.sort((a, b) => b.suggestionForToday - a.suggestionForToday)
  
  return favoritesInfo
}