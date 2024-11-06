import express from 'express';
import validateUsername from '../utils/validateUsername.js';

const router = express.Router();

export default (db) => {
  router.post('/users', async (req, res) => {
    const { username } = req.body;

    if (validateUsername(username, res)) return;

    try {
      const result = await db.run(`INSERT INTO users (username) VALUES (?)`, [
        username,
      ]);
      res.json({ id: result.lastID, username });
    } catch (error) {
      res.status(400).json({ error: 'Username must be unique' });
    }
  });

  router.get('/users', async (req, res) => {
    try {
      const users = await db.all(`SELECT * FROM users`);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};
