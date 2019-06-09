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
	const query = `SELECT * FROM comments c INNER JOIN users u ON c.author_id = u.id WHERE c.project_id = ${projectId}`;
	let result;

	try {
		const client = await pool.connect();

		result = await client.query(query);
	} catch (err) {
		throw err;
	}

	return result.rows;
};

const getRepliesToComment = async (messageId) => {
	const query = `SELECT * FROM comments c INNER JOIN users u ON c.author_id = u.id WHERE c.id = ${messageId}`;

	let result;

	try {
		const client = await pool.connect();

		result = await client.query(query);
	} catch (err) {
		throw err;
	}

	return result.rows;
};

const getUserMessages = async (userId) => {
	const query = `SELECT * FROM comments WHERE author_id = ${userId}`;

	let result;

	try {
		const client = await pool.connect();

		result = await client.query(query);
	} catch (err) {
		throw err;
	}

	return result.rows;
};

module.exports = {
	queryMessages,
	getRepliesToComment,
	getUserMessages
};
