import express from 'express';

const router = express.Router();

export default (db) => {
  router.post('/users/:_id/exercises', async (req, res) => {
    const { _id } = req.params;
    const { description, duration, date } = req.body;
    const exerciseDate = date || new Date().toISOString().split('T')[0];

    if (!description || !duration) {
      return res
        .status(400)
        .json({ error: 'Description and duration are required' });
    }

    try {
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
