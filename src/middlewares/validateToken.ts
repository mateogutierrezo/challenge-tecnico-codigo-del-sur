import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { isTokenLoggedOut } from '../utils/loggedOutTokens';

// Validar el token ingresado 
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; 

  if (!token) {
    res.status(401).json({ message: 'Missing token' });
    return;
  }

   if (isTokenLoggedOut(token)) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }

  try {
    const decoded = verifyToken(token) as { id: string };
    req.userId = decoded.id; 
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
    return;
  }
};
