const mongo = require('mongodb').MongoClient;
const mongoHost = process.env.MONGOHOST || 'localhost';
const mongoPort = process.env.MONGOPORT || '27017';
const mongoUser = process.env.MONGOUSER || '';
const mongoPassword = process.env.MONGOPASSWORD || '';
const mongoDatabase = process.env.MONGODATABASE || 'punch';

const mongoUrl = 'mongodb://' + (mongoUser ? mongoUser + ':' + mongoPassword + '@' : '') + mongoHost + ':' + mongoPort;

const queryMessages = async (projectId) => {
	let result;

	const query = {
		projectId
	};

	try {
		const client = await mongo.connect(mongoUrl, { useNewUrlParser: true });
		const db = await client.db(mongoDatabase);

		result = await db.collection('comments').find(query);
	} catch (err) {
		throw err;
	}

	return result;
};

const queryReplies = async (messageId) => {
	let result;

	const query = {
		_id: messageId
	};

	try {
		const client = await mongo.connect(mongoUrl, { useNewUrlParser: true });
		const db = await client.db(mongoDatabase);

		result = await db.collection('comments').find(query);
	} catch (err) {
		throw err;
	}

	return result;
};

const queryUserMessages = async (userId) => {
	let result;

	const query = {
		authorId: userId
	};

	try {
		const client = await mongo.connect(mongoUrl, { useNewUrlParser: true });
		const db = await client.db(mongoDatabase);

		result = await db.collection('comments').find(query);
	} catch (err) {
		throw err;
	}

	return result;
};

module.exports = {
	queryMessages,
	queryReplies,
	queryUserMessages
};
