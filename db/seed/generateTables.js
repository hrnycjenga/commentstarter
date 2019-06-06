const fs = require('fs');
const { Pool } = require('pg');
const path = require('path');
const pgHost = process.env.PGHOST || 'localhost';
const pgUser = process.env.PGUSER || 'punchcomments';
const pgDatabase = process.env.PGDATABASE || 'punch';
const pgPassword = process.env.PGPASSWORD || 'password';
const pgPort = process.env.PGPORT || 5432;

const createTables = fs.readFileSync(path.join(__dirname, 'init_tables.sql')).toString();

const pool = new Pool({
	user: pgUser,
	host: pgHost,
	database: pgDatabase,
	password: pgPassword,
	port: pgPort
});

function generateTables() {
	return pool.connect().then((client) => {
		return client
			.query(createTables)
			.then(() => {
				client.release();
				return console.log('Table Generated!');
			})
			.catch((e) => {
				client.release();
				return console.log(e);
			});
	});
}

generateTables().then(process.exit);
