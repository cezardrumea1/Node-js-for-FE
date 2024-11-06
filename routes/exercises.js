import express from 'express';

import validateDate from '../utils/validateDate.js';
import validateUserID from '../utils/validateUserID.js';
import validateDuration from '../utils/validateDuration.js';
import validateDescription from '../utils/validateDescription.js';

const router = express.Router();

export default (db) => {
  router.post('/users/:_id/exercises', async (req, res) => {
    const { _id } = req.params;
    const { description, duration, date } = req.body;

    const exerciseDate =
      date && typeof date === 'string'
        ? date.trim()
        : new Date().toISOString().split('T')[0];

    try {
      const userIDs = (await db.all(`SELECT id FROM users`)).map(
        ({ id }) => id
      );

      if (
        validateUserID(_id, userIDs, res) ||
        validateDate(exerciseDate, res) ||
        validateDescription(description, res) ||
        validateDuration(duration, res)
      ) {
        return;
      }

      const result = await db.run(
        `INSERT INTO exercises (userId, description, duration, date) VALUES (?, ?, ?, ?)`,
        [_id, description, duration, exerciseDate]
      );
      res.json({
        userId: _id,
        exerciseId: result.lastID,
        description,
        duration,
        date: exerciseDate,
      });
    } catch (error) {
      res.status(400).json({ error: 'Failed to add exercise' });
    }
  });

  return router;
};
