const path = require('path');
const model = require(path.resolve(__dirname, 'modelSql.js'));
// const model = require(path.resolve(__dirname, 'modelMongo.js'));
// const mongoModel = require(path.resolve(__dirname, 'modelMongo.js'));
// const dbType = process.env.DBTYPE || 'sql';

const getMessages = (req, res) => {
	let projectId = req.params.projId;
	model
		.queryMessages(projectId)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(400).send();
			console.log(err);
		});
};

const getRepliesToComment = (req, res) => {
	let messageId = req.params.messageId;
	model
		.queryReplies(messageId)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(400).send();
			console.log(err);
		});
};

const getUserMessages = (req, res) => {
	let userId = req.params.userId;
	model
		.queryUserMessages(userId)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(400).send();
			console.log(err);
		});
};

module.exports = {
	getMessages,
	getRepliesToComment,
	getUserMessages
};

// // retrieve comments
// app.get('/:projId/messages', (req, res) => {
// 	let projId = req.params.projId;
// 	db.all(`SELECT * FROM messages WHERE proj_id = ${projId}`, (err, data) => {
// 		if (err) {
// 			console.log(err);
// 			res.sendStatus(404);
// 		} else {
// 			res.send(data);
// 		}
// 	});
// });

// // retrieve most recent comment
// app.get('/:projId/newmessage', (req, res) => {
// 	db.get(`SELECT * FROM messages ORDER BY id DESC LIMIT 1;`, (err, data) => {
// 		if (err) {
// 			console.log(err);
// 			res.sendStatus(404);
// 		} else {
// 			res.send(data);
// 		}
// 	});
// });

// //retrieve most recent reply
// app.get('/:projId/newreply', (req, res) => {
// 	db.get(`SELECT * FROM replies ORDER BY id DESC LIMIT 1;`, (err, data) => {
// 		if (err) {
// 			console.log(err);
// 			res.sendStatus(404);
// 		} else {
// 			res.send(data);
// 		}
// 	});
// });

// //retrieve replies to comment
// app.get('/:projId/:messageId/replies', (req, res) => {
// 	let messageId = req.params.messageId;
// 	db.all(`SELECT * FROM replies WHERE reply_to = ${messageId}`, (err, data) => {
// 		if (err) {
// 			console.log(err);
// 			res.sendStatus(500);
// 		} else {
// 			res.send(data);
// 		}
// 	});
// });

// // post new comment
// app.post('/:projId/messages', (req, res) => {
// 	let projId = req.params.projId;
// 	let name = faker.name.findName();
// 	let date = new Date().toLocaleString();
// 	let avatar = faker.internet.avatar();
// 	let text = req.body.text;
// 	db.run(
// 		`INSERT INTO messages (username, posted_at, avatar_url, body, proj_id)
//   VALUES (?, ?, ?, ?, ?)`,
// 		[ name, date, avatar, text, projId ],
// 		(err, data) => {
// 			if (err) {
// 				res.sendStatus(500);
// 			} else {
// 				res.sendStatus(200);
// 			}
// 		}
// 	);
// });

// //post reply to comment
// app.post('/:projId/reply/:messageId', (req, res) => {
// 	let messageId = req.params.messageId;
// 	let name = faker.name.findName();
// 	let date = new Date().toLocaleString();
// 	let avatar = faker.internet.avatar();
// 	let text = req.body.text;

// 	db.run(
// 		`INSERT INTO replies (username, posted_at, avatar_url, body, reply_to)
//   VALUES (?, ?, ?, ?, ?)`,
// 		[ name, date, avatar, text, messageId ],
// 		(err, data) => {
// 			if (err) {
// 				res.sendStatus(500);
// 			} else {
// 				res.sendStatus(200);
// 			}
// 		}
// 	);
// });
