import fs from 'fs/promises';
import path from 'path';

const LOGOUT_FILE = path.join(__dirname, '../../data/loggedOutTokens.json');

let loggedOutTokens = new Set<string>();

// Lee los tokens deslogueados y los carga en loggedOutTokens
const readLoggedOutTokens = async () => {
  try {
    const data = await fs.readFile(LOGOUT_FILE, 'utf-8').catch(() => '[]');
    const tokens: string[] = JSON.parse(data);
    loggedOutTokens = new Set(tokens);
  } catch (error) {
    console.error('Error reading loggedOutTokens.json:', error);
    loggedOutTokens = new Set();
  }
};

// Guardar tokens deslogueados
const writeLoggedOutTokens = async () => {
  try {
    await fs.writeFile(LOGOUT_FILE, JSON.stringify([...loggedOutTokens], null, 2));
  } catch (error) {
    console.error('Error writing loggedOutTokens.json:', error);
  }
};

// Desloguear token
export const logoutToken = async (token: string) => {
  loggedOutTokens.add(token);
  await writeLoggedOutTokens();
};

// Verificar si el token está deslogueado
export const isTokenLoggedOut = (token: string) => {
  return loggedOutTokens.has(token);
};

// Inicializar al arrancar el servidor
const initLoggedOutTokens = async () => {
  await readLoggedOutTokens();
};

initLoggedOutTokens();
