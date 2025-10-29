# Challenge Técnico - Código del Sur
---
## Movie API
API desarrollada en Node.js utilizando TypeScript con Express.

---

### Funcionalidades
- Registrar un usuario.
- Autenticar un usuario.
- Obtener películas de la API <a href="https://www.themoviedb.org/movie">TheMovieDB</a>.
- Agregar una película a favoritos.
- Obtener las películas favoritas del usuario autenticado.
- Cerrar Sesión.

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/mateogutierrezo/challenge-tecnico-codigo-del-sur
cd challenge-tecnico-codigo-del-sur
```

### 2. Copiar el .env de ejemplo

```bash
cp .env.example .env
```
- **Nota:** se debe modificar el .env

### 3. Instalar dependencias
```bash
npm install
```

### 4. Iniciar el servidor
```bash
npm run dev
```

---

## Endpoints

### Autenticación

**POST /auth/signup**

Descripción: 
- Registrar usuario

Body de la petición:
```json
{
  "email": "ejemplo@example.com",
  "firstName": "un",
  "lastName": "ejemplo",
  "password": "password123"
}
```

**POST /auth/login**

Descripción:
- Iniciar sesión y obtener token JWT.

Body de la petición:
```json
{
  "email": "ejemplo@example.com",
  "password": "password123"
}
```

**POST /auth/logout**

Descripción:
- Desloguearse e invalidar token.
- Requiere autenticación.

### Películas

**GET /movies?keyword=**

Descripción:
- Obtener películas de la API <a href="https://www.themoviedb.org/movie">TheMovieDB</a>. (keyword opcional)
- Requiere autenticación.
- A cada película se le asigna un suggestionScore y se ordena la lista por ese campo.

### Favoritos

**POST /favorites**

Descripción:
- Agregar película a favoritos.
- Requiere autenticación.

Body de la petición:
```json
{
  "movieId": 123456
}
```

**GET /favorites**

Descripción:
- Obtener películas favoritas del usuario autenticado.
- Requiere autenticación.
- A cada película se le asigna un suggestionForTodayScore y se ordena la lista por ese campo.

---

**Nota:** Se agregó un usuario de prueba con las siguientes credenciales:

```json
{
  "email": "test@test.com",
  "password": "123456"
}
```
