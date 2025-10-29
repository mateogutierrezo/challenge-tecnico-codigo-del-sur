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

describe('POST /favorites', () =>{
  let mockFavorites: Favorites;

  beforeEach(() => {
    mockFavorites = {};

    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockFavorites));
    (fs.writeFile as jest.Mock).mockImplementation(async (_path, data) => {
      mockFavorites = JSON.parse(data);
    });
  });

  it('should add an item to favorites', async () => {
    const movieId = 1010581;
    const response = await request(app)
      .post('/favorites')
      .set('Authorization', `Bearer ${token}`)
      .send({ movieId: movieId });
    
    expect(response.status).toBe(201);
    
    expect(response.body).toEqual({
      message: `Movie ${movieId} successfully added to favorites`
    });

    expect(mockFavorites[user.id]).toEqual(
      expect.arrayContaining([{ movieId, addedAt: getCurrentDate() }])
    );
  });

  it('should return 400 for invalid movieId', async () => {
    const response = await request(app)
      .post('/favorites')
      .set('Authorization', `Bearer ${token}`)
      .send({ movieId: 111 });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Invalid movieId');
    expect(mockFavorites).toEqual({});
  });

  it('should return 400 for invalid field', async () => {
    const response = await request(app)
      .post('/favorites')
      .set('Authorization', `Bearer ${token}`)
      .send({ movieId: 1010581, invalidField: "invalid" });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Invalid fields: invalidField');
    expect(mockFavorites).toEqual({});
  });

  it('should return 400 for missing token', async () => {
    const response = await request(app)
      .post('/favorites')
      .send({ movieId: 1010581, invalidField: "invalid" });

    expect(response.status).toBe(401);
    expect(response.body.message).toContain('Missing token');
    expect(mockFavorites).toEqual({});
  });

  it('should return 400 for NaN movieId', async () => {
    const response = await request(app)
      .post('/favorites')
      .set('Authorization', `Bearer ${token}`)
      .send({ movieId: "someText" });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('movieId must be a number');
    expect(mockFavorites).toEqual({});
  });
});