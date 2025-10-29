import request from 'supertest';
import { app } from '../src/app';
import { generateToken } from '../src/utils/jwt';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import { Favorites } from '../src/types/Favorites';
import { getCurrentDate } from '../src/utils/date';

jest.mock('fs/promises');
const user = { id: uuidv4(), email: "test@test.com"};
const token = generateToken(user.id);

describe('GET /favorites', () => {
  let mockFavorites: Favorites;

  beforeEach(() => {
    mockFavorites = {
      [user.id]: [
        { movieId: 1311031, addedAt: getCurrentDate() },
        { movieId: 1197137, addedAt: getCurrentDate() },
        { movieId: 1010581, addedAt: getCurrentDate() }
      ]
    };

    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockFavorites));
  });

  it("should return the user's favorites array", async () => {
    const response = await request(app)
      .get('/favorites')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    response.body.forEach((movie: any) => {
      expect(movie).toHaveProperty('id');
      expect(movie).toHaveProperty('title');
      expect(movie).toHaveProperty('addedAt');
      expect(movie).toHaveProperty('suggestionForTodayScore');
    });

    console.log('Response body:', response.body);

    expect(response.body.length).toBe(3);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1197137,
          title: expect.stringContaining('Black Phone 2')
        })
      ])
    );
    expect(response.body[0].suggestionForTodayScore).toBeGreaterThan(response.body[1].suggestionForTodayScore);
    expect(response.body[1].suggestionForTodayScore).toBeGreaterThan(response.body[2].suggestionForTodayScore);
  });

  it('should return 400 for missing token', async () => {
    const response = await request(app)
      .get('/favorites')
      .send({ movieId: 1010581, invalidField: "invalid" });

    expect(response.status).toBe(401);
    expect(response.body.message).toContain('Missing token');
  });
});