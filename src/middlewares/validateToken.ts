import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { loggedOutTokens } from '../utils/loggedOutTokens';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; 

  if (!token) {
    res.status(401).json({ message: 'Token missing' });
    return;
  }

   if (loggedOutTokens.has(token)) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }

  try {
    const decoded = verifyToken(token) as { id: string };
    req.userId = decoded.id; 
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
    return;
  }
};
