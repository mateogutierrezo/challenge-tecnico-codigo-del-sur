import { Request, Response } from 'express';
import { register, login, logout } from '../services/auth.service';

export const signUpUser = async (req: Request, res: Response) => {
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

export const logoutUser = async (req: Request, res: Response) => {
  try {
    // obtener el token de la petición
    const token = req.headers.authorization?.split(' ')[1] as string;
    const message = await logout(token);
    res.status(200).json(message);
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
};