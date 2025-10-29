import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

// hashear contraseña
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

// Compara contraseña ingresada por el usuario con el hash almacenado.
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
}