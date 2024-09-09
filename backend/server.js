import express from 'express';
import cors from 'cors';
import moment from 'moment';
import data from './data.json' assert { type: 'json' };
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtenez le chemin du répertoire courant
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

// Servir des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route pour récupérer les possessions
app.get('/possession', (req, res) => {
  console.log('GET /possession request received');
  const possessions = data.find(item => item.model === 'Patrimoine')?.data.possessions || [];
  res.json(possessions);
});

// Route de fallback pour servir index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
