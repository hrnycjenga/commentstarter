const path = require('path');
const model = require(path.resolve(__dirname, 'modelSql.js'));

const getMessages = async (req, res) => {
	let projectId = req.params.projId;
	if (projectId === 'random') {
		projectId = Math.ceil(Math.random() * 10000000);
	}

	try {
		const data = await model.queryMessages(projectId);
		res.status(200).send(data);
	} catch (err) {
		res.status(400).send();
		return console.log(err);
	}
};

const getRepliesToComment = async (req, res) => {
	let messageId = req.params.messageId;

	try {
		const data = await model.queryReplies(messageId);
		res.status(200).send(data);
	} catch (err) {
		res.status(400).send();
		return console.log(err);
	}
};

const getUserMessages = async (req, res) => {
	let userId = req.params.userId;

	try {
		const data = await model.queryReplies(userId);
		res.status(200).send(data);
	} catch (err) {
		res.status(400).send();
		return console.log(err);
	}
};

const addComment = async (req, res) => {
	try {
		const data = await model.insertMessage(req.body);
		res.status(200).send(data);
	} catch (err) {
		res.status(400).send();
		return console.log(err);
	}
};

module.exports = {
	getMessages,
	getRepliesToComment,
	getUserMessages,
	addComment
};
