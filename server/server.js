const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const faker = require('faker');
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.resolve(__dirname, '../db/comments.db')
console.log(dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  }
});

app.use(parser.json());

let port = 3000
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})

app.get('/:projId', (req, res) => {
  let projId = req.params.projId
  db.all(`SELECT * FROM messages WHERE proj_id = ${projId}`, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      res.send(data);
    }
  })
})

app.post('/:projId', (req, res) => {
  let projId = req.params.projId
  let name = faker.name.findName();
  let date = new Date().toLocaleString();
  let avatar = faker.image.cats();
  let text = req.body.text;
  
  db.run(`INSERT INTO messages (username, posted_at, avatar_url, body, proj_id)
  VALUES (?, ?, ?, ?, ?)`, [name, date, avatar, text, projId], (err, data) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})

app.post('/:projId/:messageId', (req, res) => {
  let messageId = req.params.messageId
  let name = faker.name.findName();
  let date = new Date().toLocaleString();
  let avatar = faker.image.cats();
  let text = req.body.text;
  
  db.run(`INSERT INTO replies (username, posted_at, avatar_url, body, reply_to)
  VALUES (?, ?, ?, ?, ?)`, [name, date, avatar, text, messageId], (err, data) => {
    if (err) {
      res.sendStatus(500)
    } else {
      console.log(data)
      res.sendStatus(200)
    }
  })
})