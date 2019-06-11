const { Pool } = require('pg');
const pgHost = process.env.PGHOST || 'localhost';
const pgUser = process.env.PGUSER || 'punchcomments';
const pgDatabase = process.env.PGDATABASE || 'punch';
const pgPassword = process.env.PGPASSWORD || 'password';
const pgPort = process.env.PGPORT || 5432;

const pool = new Pool({
	user: pgUser,
	host: pgHost,
	database: pgDatabase,
	password: pgPassword,
	port: pgPort
});

const queryMessages = async (projectId) => {
	const query = `SELECT c.id AS id, c.project_id AS project_id, c.parent_id AS parent_id, c.author_id AS author_id,
								c.created_at AS created_at, c.comment_body AS comment_body, u.first_name AS first_name, u.last_name AS last_name,
								u.avatar_url AS avatar_url, u.email AS email FROM comments c INNER JOIN users u ON c.author_id = u.id
								WHERE c.project_id = ${projectId}`;
	let result, client;

	try {
		console.log(`🚀 Attempt to connect to database ${pgDatabase} at ${pgHost}:${pgPort}`);
		client = await pool.connect();

		result = await client.query(query);
	} catch (err) {
		throw err;
	}

	client.release();
	return result.rows;
};

const queryReplies = async (messageId) => {
	const query = `SELECT * FROM comments c INNER JOIN users u ON c.author_id = u.id WHERE c.id = ${messageId}`;
	let result, client;

	try {
		client = await pool.connect();

		result = await client.query(query);
	} catch (err) {
		throw err;
	}

	client.release();
	return result.rows;
};

const queryUserMessages = async (userId) => {
	const query = `SELECT * FROM comments WHERE author_id = ${userId}`;
	let result, client;

	try {
		client = await pool.connect();

		result = await client.query(query);
	} catch (err) {
		throw err;
	}

	client.release();
	return result.rows;
};

module.exports = {
	queryMessages,
	queryReplies,
	queryUserMessages
};
