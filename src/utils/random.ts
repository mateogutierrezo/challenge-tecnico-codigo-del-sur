import { getCurrentDate } from "./date";
import seedrandom from 'seedrandom';

// Random entre 0 y 99
export const getRandomSuggestionScore = (): number => {
  return Math.floor(Math.random() * 100);
}

// se usa una semilla que dependa del id y la fecha para que el random sea único por día.
export const getRandomSuggestionForTodayScore = (movieId: number): number => {
  const today = getCurrentDate();
  const randomGenerator = seedrandom(`${movieId}-${today}`);
  return Math.floor(randomGenerator() * 100);
}