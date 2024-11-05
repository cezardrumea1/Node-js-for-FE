import { fileURLToPath } from 'url';
import path from 'path';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { initDB, closeDB } from './db-setup.js';
import createApiRouter from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

const db = await initDB();
closeDB(db);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/api', createApiRouter(db));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
