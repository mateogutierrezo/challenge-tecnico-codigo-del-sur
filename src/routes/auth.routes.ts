import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';
import { registerValidation, loginValidation } from '../validators/auth.validator';
import { handleValidation } from '../middlewares/handleValidation';
import { checkExtraFields } from '../middlewares/checkExtraFields';
import { logout } from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/validateToken';

const router = Router();

// POST /api/auth/register
router.post(
  '/register', 
  registerValidation, 
  handleValidation, 
  checkExtraFields(['email', 'firstName', 'lastName', 'password']), 
  registerUser
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
  logout
)

export default router;