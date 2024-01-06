require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('static'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

db.connect(err => {
  if (err) {
    console.error('Errore di connessione al database:', err);
    return;
  }
  console.log('Connesso al database MySQL');
});

// Routes
app.get('/', (req, res) => {
  res.sendFile('home.html', {root: __dirname + "/static"})
});

app.get('/script.js', (req, res) => {
  res.sendFile('script.js', {root: __dirname + "/static"})
});

app.get('/schema-er', (req, res) => {
  res.sendFile('schema-er.png', {root: __dirname + "/static"})
});

app.get('/style.css', (req, res) => {
  res.sendFile('style.css', {root: __dirname + "/static"})
});

app.get('/credits', (req, res) => {
  res.sendFile('credits.html', {root: __dirname + "/static"})
});

app.get('/eseguiQuery', async (req, res) => {
  res.sendFile('eseguiQuery.html', {root: __dirname + "/static"})
});

app.post('/eseguiQuery', async (req, res) => {
  const {query} = req.body
  db.query(query, (err, results, fields) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(results);
  });
});

// Avvia il server
app.listen(port);
