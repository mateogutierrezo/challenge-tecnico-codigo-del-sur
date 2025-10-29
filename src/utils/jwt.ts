import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// generar token
export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

// verificar que el token sea válido
export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded; 
  } catch (error) {
    throw new Error('Invalid token');
  }
};