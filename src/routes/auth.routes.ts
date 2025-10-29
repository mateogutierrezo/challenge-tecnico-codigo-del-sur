import { Router } from 'express';
import { signUpUser, loginUser, logoutUser } from '../controllers/auth.controller';
import { signUpValidation, loginValidation } from '../validators/auth.validator';
import { handleValidation } from '../middlewares/handleValidation';
import { checkExtraFields } from '../middlewares/checkExtraFields';
import { authenticateToken } from '../middlewares/validateToken';

const router = Router();

// POST /api/auth/signup
router.post(
  '/signup', 
  signUpValidation,
  handleValidation,
  checkExtraFields(['email', 'firstName', 'lastName', 'password']),
  signUpUser
);

// POST /api/auth/login
router.post(
  '/login',
  loginValidation,
  handleValidation,
  checkExtraFields(['email', 'password']),
  loginUser
);

// POST /api/auth/logout
router.post(
  '/logout',
  authenticateToken,
  logoutUser
)

export default router;