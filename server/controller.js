const path = require('path');
const model = require(path.resolve(__dirname, 'modelSql.js'));

const getMessages = async (ctx) => {
	let projectId = ctx.params.projId;
	if (projectId === 'random') {
		projectId = Math.ceil(Math.random() * 10000000);
	}

	try {
		const data = await model.queryMessages(projectId);
		ctx.status = 200;
		ctx.body = data;
	} catch (err) {
		ctx.stats = 400;

		return console.log(err);
	}
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
			return console.log(err);
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
			return console.log(err);
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
