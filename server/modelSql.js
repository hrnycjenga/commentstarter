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
	const query = `SELECT c.*, u.first_name, u.last_name, u.avatar_url, u.email FROM comments c INNER JOIN users u ON c.author_id = u.id
								WHERE c.project_id = ${projectId}`;
	try {
		// console.log(`🚀 Attempt to connect to database ${pgDatabase} at ${pgHost}:${pgPort} as ${pgUser}`);
		let result = await pool.query(query);
		return result.rows;
	} catch (err) {
		return Promise.reject(err);
	}
};

const queryReplies = async (messageId) => {
	const query = `SELECT * FROM comments c INNER JOIN users u ON c.author_id = u.id WHERE c.id = ${messageId}`;
	let result, client;

	try {
		client = await pool.connect();

		result = await client.query(query);
	} catch (err) {
		return Promise.reject(err);
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
		return Promise.reject(err);
	}

	client.release();
	return result.rows;
};

const insertMessage = async ({ project_id, parent_id, author_id, created_at, comment_body }) => {
	const query = `WITH inserted AS (
									INSERT INTO comments (project_id, parent_id, author_id, created_at, comment_body) 
									VALUES ($1, $2, $3, $4, $5) RETURNING *
								) SELECT inserted.*, users.first_name, users.last_name, users.avatar_url, users.email
								FROM inserted INNER JOIN users
								ON inserted.author_id = users.id`;
	let result, client;

	try {
		// console.log(
		// 	`🚀 Attempt to connect to database ${pgDatabase} at ${pgHost}:${pgPort} and will attempt to post message: ${comment_body}`
		// );
		client = await pool.connect();
		result = await client.query(query, [ project_id, parent_id, author_id, created_at, comment_body ]);
	} catch (err) {
		return Promise.reject(err);
	}

	client.release();
	return result.rows;
};

module.exports = {
	queryMessages,
	queryReplies,
	queryUserMessages,
	insertMessage
};
