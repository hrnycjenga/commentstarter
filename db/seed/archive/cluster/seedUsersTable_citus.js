const { Pool } = require('pg');
const faker = require('faker');

const pgHost = process.env.PGHOST || 'localhost';
const pgUser = process.env.PGUSER || 'postgres';
const pgDatabase = process.env.PGDATABASE || 'postgres';
const pgPassword = process.env.PGPASSWORD || '';
const pgPort = process.env.PGPORT || 5433;

const copyFrom = require('pg-copy-streams').from;
const Readable = require('stream').Readable;

const pool = new Pool({
	user: pgUser,
	host: pgHost,
	database: pgDatabase,
	password: pgPassword,
	port: pgPort
});

console.time('seedTime');
pool.connect().then((client) => {
	let done = () => {
		client.release();
	};

	const stream = client.query(copyFrom('COPY users (first_name,last_name,email,avatar_url,created_at) FROM STDIN'));
	const rs = new Readable();

	let count = 0;

	rs._read = () => {
		if (count >= 2000000) {
			rs.push(null);
		} else {
			rs.push(
				faker.name.firstName() +
					'\t' +
					faker.name.lastName() +
					'\t' +
					faker.internet.email() +
					'\t' +
					faker.internet.avatar() +
					'\t' +
					faker.date.recent(90).toUTCString() +
					'\n'
			);
			count++;
		}
	};
	let onError = (strErr) => {
		console.error('Something went wrong:', strErr);
		done();
	};

	rs.on('error', onError);
	stream.on('error', onError);
	stream.on('end', done);
	rs.pipe(stream);
});

process.on('exit', () => {
	console.timeEnd('seedTime');
});
