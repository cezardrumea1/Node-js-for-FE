import request from 'supertest';

describe('User Endpoints', () => {
  beforeEach(async () => {
    await db.run('DELETE FROM users');
  });

  test('POST /api/users with username should create a new user', async () => {
    const { status, body } = await request(app)
      .post('/api/users')
      .send({ username: 'testuser' });

    expect(status).toBe(200);
    expect(body).toHaveProperty('username', 'testuser');
    expect(body).toHaveProperty('id');
  });

  test('GET /api/users should return a list of all users', async () => {
    await db.run(`INSERT INTO users (username) VALUES ('user1'), ('user2')`);

    const { status, body } = await request(app).get('/api/users');

    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);

    body.forEach((user) => {
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('id');
    });
  });
});
