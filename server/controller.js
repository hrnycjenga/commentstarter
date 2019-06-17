const path = require('path');
const model = require(path.resolve(__dirname, 'modelSql.js'));
const redis = require('redis');
const { promisify } = require('util');
const redisPort = process.env.REDISPORT || 6379;
const redisClient = redis.createClient(redisPort);
const redisGetAsync = promisify(redisClient.get).bind(redisClient);
const redisSetAsync = promisify(redisClient.set).bind(redisClient);

redisClient.on('error', (err) => {
	console.log('Error ' + err);
});
redisClient.on('ready', () => {
	console.log(`Connected to Redis DB at ${redisPort}`);
});

const getMessages = async (req, res) => {
	let projectId = req.params.projId;
	try {
		const redisCache = await redisGetAsync(projectId);
		if (redisCache) {
			// console.log('Sending From Redis Cache');
			res.status(200).json(JSON.parse(redisCache));
		} else {
			const data = await model.queryMessages(projectId);
			// console.log('Sending From Postgres');
			res.status(200).json(data);
			redisSetAsync(projectId, JSON.stringify(data));
		}
	} catch (err) {
		res.status(400).send();
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
