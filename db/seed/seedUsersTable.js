const { Pool } = require('pg');
const faker = require('faker');

const pgHost = process.env.PGHOST || 'localhost';
const pgUser = process.env.PGUSER || 'punchcomments';
const pgDatabase = process.env.PGDATABASE || 'punch';
const pgPassword = process.env.PGPASSWORD || 'password';
const pgPort = process.env.PGPORT || 5432;

const copyFrom = require('pg-copy-streams').from;
const Readable = require('stream').Readable;
const seedCount = process.env.SEEDCOUNT || 1000000;
const iterations = process.env.ITERATIONS || 1;
let currentIteration = 0;

console.log(
	`🚀 Attempt to seed ${seedCount} records x ${iterations} times to database ${pgDatabase} at ${pgHost}:${pgPort}`
);

const pool = new Pool({
	user: pgUser,
	host: pgHost,
	database: pgDatabase,
	password: pgPassword,
	port: pgPort
});

console.time('seedTime');

const seedDb = () => {
	currentIteration++;

	console.log(`✈️  Iteration #${currentIteration}`);

	pool.connect().then((client) => {
		let done = () => {
			console.log(`Iteration #${currentIteration} complete 🎊`);
			client.release();
			if (currentIteration < iterations) {
				seedDb();
			}
		};

		let count = 0;

		const stream = client.query(
			copyFrom('COPY users (first_name,last_name,email,avatar_url,created_at) FROM STDIN')
		);
		const rs = new Readable();

		rs._read = () => {
			if (count >= seedCount) {
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
};

seedDb();

process.on('exit', () => {
	console.timeEnd('seedTime');
});
