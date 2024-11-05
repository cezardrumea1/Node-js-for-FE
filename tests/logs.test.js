import request from 'supertest';

describe('Logs Endpoints', () => {
  beforeEach(async () => {
    await db.run('DELETE FROM users');
    await db.run('DELETE FROM exercises');
  });

  test('GET /api/users/:_id/logs should retrieve a full exercise log with count and log array', async () => {
    const user = await db.run(
      `INSERT INTO users (username) VALUES ('Natasha')`
    );
    const userId = user.lastID;

    await db.run(
      `INSERT INTO exercises (userId, description, duration, date) VALUES (?, ?, ?, ?)`,
      [userId, 'Swimming', 45, '2024-01-02']
    );

    const { status, body } = await request(app).get(
      `/api/users/${userId}/logs`
    );

    const log = body.logs[0];

    expect(status).toBe(200);
    expect(Array.isArray(body.logs)).toBe(true);
    expect(body.logs.length).toBe(1);
    expect(body).toHaveProperty('username', 'Natasha');
    expect(body).toHaveProperty('id', userId);
    expect(body).toHaveProperty('count', 1);
    expect(log).toHaveProperty('description', 'Swimming');
    expect(log).toHaveProperty('duration', 45);
    expect(log).toHaveProperty('date', '2024-01-02');
  });

  test('GET /api/users/:_id/logs should support from, to, and limit filters', async () => {
    const user = await db.run(
      `INSERT INTO users (username) VALUES ('testuser')`
    );
    const userId = user.lastID;

    await db.run(
      `INSERT INTO exercises (userId, description, duration, date) VALUES (?, ?, ?, ?)`,
      [userId, 'Swimming', 30, '2024-01-01']
    );
    await db.run(
      `INSERT INTO exercises (userId, description, duration, date) VALUES (?, ?, ?, ?)`,
      [userId, 'Cycling', 60, '2024-01-02']
    );
    await db.run(
      `INSERT INTO exercises (userId, description, duration, date) VALUES (?, ?, ?, ?)`,
      [userId, 'Running', 90, '2024-01-03']
    );

    const { status, body } = await request(app).get(
      `/api/users/${userId}/logs?from=2024-01-01&to=2024-01-03&limit=2`
    );

    const logDescriptions = body.logs.map((log) => log.description);

    expect(status).toBe(200);
    expect(body.logs.length).toBe(2);
    expect(logDescriptions).toEqual(['Swimming', 'Cycling']);
  });

  test('GET /api/users/:_id/logs should return log array items with description, duration, and date properties', async () => {
    const user = await db.run(
      `INSERT INTO users (username) VALUES ('testuser')`
    );
    const userId = user.lastID;

    await db.run(
      `INSERT INTO exercises (userId, description, duration, date) VALUES (?, ?, ?, ?)`,
      [userId, 'Cycling', 60, '2024-01-03']
    );

    const { status, body } = await request(app).get(
      `/api/users/${userId}/logs`
    );

    const log = body.logs[0];

    expect(status).toBe(200);
    expect(typeof log.description).toBe('string');
    expect(typeof log.duration).toBe('number');
    expect(typeof log.date).toBe('string');
  });
});
