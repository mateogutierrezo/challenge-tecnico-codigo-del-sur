import { Router } from 'express';
import { getMovies } from '../controllers/movie.controller';
import { authenticateToken } from '../middlewares/validateToken';

const router = Router();

// POST /api/movies/
router.get(
  '/',
  authenticateToken,
  getMovies
);

export default router;