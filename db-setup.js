import fs from 'fs';
import path from 'path';

import { Database } from 'sqlite-async';

process.env.NODE_ENV = 'test';

export async function initDB(inMemory = false) {
  const dbPath = inMemory ? ':memory:' : './db/sqlite.db';

  if (!inMemory) {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  const db = await Database.open(dbPath);

  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      description TEXT NOT NULL,
      duration INTEGER NOT NULL,
      date TEXT,
      FOREIGN KEY(userId) REFERENCES users(id)
    )
  `);

  return db;
}

export function closeDB(db) {
  process.on('SIGINT', async () => {
    await db.close();
    process.exit(0);
  });
}
