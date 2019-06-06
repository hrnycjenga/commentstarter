const fs = require('fs');
const { Pool } = require('pg');
const path = require('path');
const pgHost = process.env.PGHOST || 'localhost';
const pgUser = process.env.PGUSER || 'postgres';
const pgDatabase = process.env.PGDATABASE || 'postgres';
const pgPassword = process.env.PGPASSWORD || '';
const pgPort = process.env.PGPORT || 5433;

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
				return console.log('Distributed table Generated!');
			})
			.catch((e) => {
				client.release();
				return console.log(e);
			});
	});
}

generateTables().then(process.exit);
