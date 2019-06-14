const path = require('path');
const model = require(path.resolve(__dirname, 'modelSql.js'));

const getMessages = (req, res) => {
	let projectId = req.params.projId;

	// try {
	// 	const data = await model.queryMessages(projectId);
	// 	res.status(200).json(data);
	// } catch (err) {
	// 	res.status(400).send();
	// 	console.log(err);
	// }

	const query = `SELECT c.*, u.first_name, u.last_name, u.avatar_url, u.email FROM comments c INNER JOIN users u ON c.author_id = u.id
								WHERE c.project_id = ${projectId}`;
	model.pool.query(query, (err, result) => {
		if (err) {
			res.status(400).send();
			return console.log(err);
		} else {
			return res.status(200).json(result.rows);
		}
	});
};

const getRepliesToComment = (req, res) => {
	let messageId = req.params.messageId;
	model
		.queryReplies(messageId)
		.then((data) => {
			res.status(200).json(data);
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
			res.status(200).json(data);
		})
		.catch((err) => {
			res.status(400).send();
			console.log(err);
		});
};

const addComment = (req, res) => {
	model
		.insertMessage(req.body)
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			res.status(400).send();
			console.log(err);
		});
};

module.exports = {
	getMessages,
	getRepliesToComment,
	getUserMessages,
	addComment
};
