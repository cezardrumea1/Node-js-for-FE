import request from 'supertest';

describe('Exercise Endpoints', () => {
  beforeEach(async () => {
    await db.run('DELETE FROM users');
    await db.run('DELETE FROM exercises');
  });

  test('POST /api/users/:_id/exercises should add an exercise with optional date', async () => {
    const user = await db.run(
      `INSERT INTO users (username) VALUES ('testuser')`
    );
    const userId = user.lastID;

    const exerciseData = {
      description: 'Coding',
      duration: 69,
    };

    const { status, body } = await request(app)
      .post(`/api/users/${userId}/exercises`)
      .send(exerciseData);

    expect(status).toBe(200);
    expect(body).toHaveProperty('userId', userId.toString());
    expect(body).toHaveProperty('description', 'Coding');
    expect(body).toHaveProperty('duration', 69);
    expect(body).toHaveProperty('date');
  });
});
