const sqlite3 = require('sqlite3').verbose();
const faker = require('faker');
const path = require('path');
const dbPath = path.join(__dirname, 'comments.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the comments database.');
});

const comments = () => {
  let data = []
  while (data.length <= 600) {
    data.push({
      username: faker.name.findName(),
      postedAt: faker.date.recent(10),
      avatarUrl: faker.image.cats(),
      body: faker.lorem.sentences(faker.random.number({min:1, max:7})),
      projId: faker.random.number({min:1, max:100})
    })
  }
  return data;
}

const replies = () => {
  let data = []
  while (data.length <= 300) {
    data.push({
      username: faker.name.findName(),
      postedAt: faker.date.recent(10),
      avatarUrl: faker.image.cats(),
      body: faker.lorem.sentences(faker.random.number({min:1, max:7})),
      replyTo: faker.random.number({min:1, max:600})
    })
  }
  return data;
}

// const projects = () => {
//   let data = [];
//   while (data.length <= 100) {
//     data.push({
//       projName: faker.commerce.productName()
//     })
//   }
// }

comments().forEach( comment => {
  db.run(`INSERT INTO MESSAGES (username, posted_at, avatar_url, body, proj_id) 
  VALUES (?, ?, ?, ?, ?)`, [comment.username, comment.postedAt, comment.avatarUrl, comment.body, comment.projId])
});

replies().forEach( reply => {
  db.run(`INSERT INTO REPLIES (username, posted_at, avatar_url, body, reply_to) 
  VALUES (?, ?, ?, ?, ?)`, [reply.username, reply.postedAt, reply.avatarUrl, reply.body, reply.replyTo])
});
