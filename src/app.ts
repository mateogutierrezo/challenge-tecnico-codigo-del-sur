import express from 'express';
import authRoutes from './routes/auth.routes';
import movieRoutes from './routes/movies.routes';
import favoriteRoutes from './routes/favorites.routes';
import { simpleRateLimit } from './middlewares/rateLimiter';

export const app = express();

app.use(express.json());

app.use(simpleRateLimit)

app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);
app.use('/favorites', favoriteRoutes);