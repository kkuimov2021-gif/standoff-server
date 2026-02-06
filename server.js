import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'client')));

let players = [];
let matches = [];

let playerId = 1;
let matchId = 1;

// players
app.get('/api/players', (req, res) => res.json(players));

app.post('/api/players', (req, res) => {
  const player = {
    id: playerId++,
    name: req.body.name,
    rating: 0
  };
  players.push(player);
  res.json(player);
});

// matches
app.get('/api/matches', (req, res) => res.json(matches));

app.post('/api/matches', (req, res) => {
  const match = {
    id: matchId++,
    time: req.body.time,
    team1: req.body.team1 || [],
    team2: req.body.team2 || []
  };
  matches.push(match);
  res.json(match);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on', PORT));
