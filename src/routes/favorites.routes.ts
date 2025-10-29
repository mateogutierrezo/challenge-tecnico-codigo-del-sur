import { Router } from 'express';
import { addToFavorites, getFavorites } from '../controllers/favorites.controller';
import { authenticateToken } from '../middlewares/validateToken';
import { checkExtraFields } from '../middlewares/checkExtraFields';

const router = Router();

// POST /api/favorites
router.post(
  '/',
  authenticateToken,
  checkExtraFields(["movieId"]),
  addToFavorites
);

// POST /api/favorites
router.get(
  '/',
  authenticateToken,
  getFavorites
);

export default router;
