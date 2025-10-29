import { Request, Response } from 'express';
import { getMoviesService } from '../services/movies.service';

export const getMovies = async (req: Request, res: Response) => {
  try {
    // Obtener la keyword de la petición.
    const { keyword } = req.query || {};
    if (keyword !== undefined && typeof keyword !== 'string') throw new Error('keyword must be a string')

    const movies = await getMoviesService(keyword as string);
    res.status(200).json(movies);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};