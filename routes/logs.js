import express from 'express';

const router = express.Router();

export default (db) => {
  router.get('/users/:_id/logs', async (req, res) => {
    const { _id } = req.params;
    const { from, to, limit } = req.query;

    try {
      const user = await db.get(`SELECT * FROM users WHERE id = ?`, [_id]);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      let query = `SELECT * FROM exercises WHERE userId = ?`;
      const params = [_id];

      if (from) {
        query += ` AND date >= ?`;
        params.push(from);
      }
      if (to) {
        query += ` AND date <= ?`;
        params.push(to);
      }
      if (limit) {
        query += ` LIMIT ?`;
        params.push(parseInt(limit, 10));
      }

      const logs = await db.all(query, params);
      res.json({ ...user, logs, count: logs.length });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch logs' });
    }
  });

  return router;
};
