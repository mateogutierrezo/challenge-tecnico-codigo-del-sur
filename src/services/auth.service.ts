import fs from 'fs/promises';
import path from 'path';
import { User } from '../types/User.js';
import { generateToken } from '../utils/jwt';
import { v4 as uuidv4 } from 'uuid';
import { comparePassword, hashPassword } from '../utils/hash';

const USERS_FILE = path.join(__dirname, '../../data/users.json');

// Leer usuarios de users.json
const readUsers = async (): Promise<User[]> => {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8').catch(() => '[]');
    return JSON.parse(data) as User[];
  } catch (err) {
    console.error('Error reading users.json:', err);
    throw err;
  }
};

// Guardar usuarios en users.json
const writeUsers = async (users: User[]) => {
  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error writing users.json:', err);
    throw err;
  }
};

interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

// Registrar un usuario
export const register = async (data: RegisterData): Promise<User> => {
    const users = await readUsers();

  // Verificar si el email ya existe
  if (users.find(u => u.email === data.email)) {
    throw new Error('Already registered user');
  }

  // Obtener contraseña hasheada
  const hashedPassword = await hashPassword(data.password);

  // Crear usuario agregando un id único
   const newUser: User = {
    id: uuidv4(),
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    password: hashedPassword
  };

  users.push(newUser);

  await writeUsers(users);
  return newUser;
};

// Autenticar un usuario
export const login = async (data: LoginData): Promise<string> => {
  const users = await readUsers();

  // buscar si existe el usuario
  const user = users.find(u => u.email === data.email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

   // Verificar contraseña
  const isPasswordValid = await comparePassword(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Dovolver token
  return generateToken(user.id);
};