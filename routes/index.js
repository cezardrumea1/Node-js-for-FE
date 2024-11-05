import express from 'express';
import usersRoutes from './users.js';
import exercisesRoutes from './exercises.js';
import logsRoutes from './logs.js';

export default (db) => {
  const router = express.Router();

  router.use(usersRoutes(db));
  router.use(exercisesRoutes(db));
  router.use(logsRoutes(db));

  return router;
};
