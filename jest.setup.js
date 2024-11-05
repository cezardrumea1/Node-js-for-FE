import express from 'express';
import { initDB } from './db-setup.js';
import createApiRouter from './routes';

let app, db;

beforeAll(async () => {
  db = await initDB(true);
  app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api', createApiRouter(db));

  global.app = app;
  global.db = db;
});

afterAll(async () => {
  await db.close();

  delete global.app;
  delete global.db;
});
