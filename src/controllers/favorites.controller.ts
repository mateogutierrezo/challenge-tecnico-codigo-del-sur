import { Request, Response } from 'express';
import { addToFavoritesService, getFavoritesService } from "../services/favorites.service";

export const addToFavorites = async (req: Request, res: Response) => {
  try {
    const userId = req.userId as string;

    // Checkear que movieId no sea una cadena de texto
    const { movieId } = req.body;
    const movieIdNumber = Number(movieId);
   
    if (isNaN(movieIdNumber)) throw new Error('movieId must be a number');

    const message = await addToFavoritesService(userId, movieIdNumber);
    res.status(201).json(message);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export const getFavorites = async (req: Request, res: Response) => {
  try {
    // obtener el id del usuario.
    const userId = req.userId as string;
    const favorites = await getFavoritesService(userId);
    res.status(200).json(favorites);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}