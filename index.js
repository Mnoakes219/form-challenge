const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: 'db', // Important: Use 'db' because that's the docker-compose service name
  user: 'root',
  password: 'password',
  database: 'formdb'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Endpoint to save a form entry
app.post('/api/submit', (req, res) => {
  const { name, email, phone } = req.body;
  const sql = 'INSERT INTO entries (name, email, phone) VALUES (?, ?, ?)';
  db.query(sql, [name, email, phone], (err, result) => {
    if (err) {
      console.error('Error inserting entry:', err);
      return res.status(500).send('Error saving entry');
    }
    res.status(200).send('Entry saved');
  });
});

// Endpoint to list all entries
app.get('/api/entries', (req, res) => {
  const sql = 'SELECT * FROM entries';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching entries:', err);
      return res.status(500).send('Error fetching entries');
    }
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
