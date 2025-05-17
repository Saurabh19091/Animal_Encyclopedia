import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import animalRoutes from './routes/animalRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/animals', animalRoutes);

const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));
app.use('/css', express.static(path.join(frontendPath, 'css')));
app.use('/js', express.static(path.join(frontendPath, 'js')));
app.use('/assets', express.static(path.join(frontendPath, 'assets')));
app.use('/shared', express.static(path.join(frontendPath, 'shared')));

app.get('/', (req, res) => res.sendFile(path.join(frontendPath, 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(frontendPath, 'login.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(frontendPath, 'signup.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(frontendPath, 'admin.html')));
app.get('/animal', (req, res) => res.sendFile(path.join(frontendPath, 'animal.html')));
app.get('/create-animal', (req, res) => res.sendFile(path.join(frontendPath, 'create-animal.html')));
app.get('/:page.html', (req, res) => res.sendFile(path.join(frontendPath, `${req.params.page}.html`)));

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

export default app;
