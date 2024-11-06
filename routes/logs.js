import express from 'express';
import validateQueryParams from '../utils/validateQueryParams.js';
import buildLogsQuery from '../utils/buildLogsQuery.js';

const router = express.Router();

export default (db) => {
  router.get('/users/:_id/logs', async (req, res) => {
    const { _id } = req.params;
    const { from, to, limit } = req.query;

    if (validateQueryParams(from, to, limit, res)) return;

    try {
      const user = await db.get(`SELECT * FROM users WHERE id = ?`, [_id]);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { logsQuery, countQuery, params } = buildLogsQuery(
        _id,
        from,
        to,
        limit
      );

      const { count } = await db.get(countQuery, params);

      const logs = await db.all(logsQuery, params);

      res.json({ ...user, logs, count });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch logs' });
    }
  });

  return router;
};
