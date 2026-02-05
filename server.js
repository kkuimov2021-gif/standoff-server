import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// нужно для ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👉 говорим Express раздавать папку client
app.use(express.static(path.join(__dirname, 'client')));

// корневой роут
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
