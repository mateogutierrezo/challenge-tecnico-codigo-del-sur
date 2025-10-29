import { Request, Response } from 'express';
import { register, login } from '../services/auth.service';
import { loggedOutTokens } from '../utils/loggedOutTokens';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await register(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const token = await login(req.body);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};



export const logout = (req: Request, res: Response): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(400).json({ message: 'Token missing' });
    return;
  }

  if (loggedOutTokens.has(token)) {
    res.status(400).json({ message: 'Token already logged out' });
    return;
  }

  loggedOutTokens.add(token)

  res.status(200).json({ message: 'Logged out successfully' });
};