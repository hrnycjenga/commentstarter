const { Pool } = require('pg');
const faker = require('faker');

const pgHost = process.env.PGHOST || 'localhost';
const pgUser = process.env.PGUSER || 'punchcomments';
const pgDatabase = process.env.PGDATABASE || 'punch';
const pgPassword = process.env.PGPASSWORD || 'password';
const pgPort = process.env.PGPORT || 5432;

const copyFrom = require('pg-copy-streams').from;
const Readable = require('stream').Readable;
const seedCount = +process.env.SEEDCOUNT || 1000000;
const iterations = +process.env.ITERATIONS || 1;
let startingRow = +process.env.START_ROW || 0;
let currentIteration = 0;
let endRow = startingRow + seedCount;

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
	let count = startingRow;
	let lastCommentId, parentId, authorId, projectId, lastProjectId, randomDate, lastDate, randomNum;
	let currentTime = new Date();

	console.log(`✈️  Iteration #${currentIteration} start, starting with row ${startingRow} and ending row ${endRow}`);

	pool.connect().then((client) => {
		let done = () => {
			console.log(`   Iteration #${currentIteration} complete 🎊`);
			client.release();
			if (currentIteration < iterations) {
				startingRow += seedCount;
				endRow += seedCount;
				seedDb();
			} else {
				running = false;
			}
		};

		const stream = client.query(
			copyFrom('COPY comments (project_id,parent_id,author_id,comment_body,created_at) FROM STDIN')
		);

		const rs = new Readable({
			read() {
				if (count >= endRow) {
					rs.push(null);
				} else {
					if (count % 100000 === 0 && count > startingRow) {
						const rss = process.memoryUsage().rss / 1024 / 1024;
						console.log(
							`🥅 Streamed ${count} records with memory usage at ${Math.round(rss * 100) / 100}MB`
						);
					}
					randomNum = Math.random() * 10;
					authorId = Math.floor(Math.random() * 20000000 + 1);

					if (randomNum > 5 && count > startingRow) {
						projectId = lastProjectId;
						parentId = lastCommentId;
						randomDate = new Date(
							currentTime.getTime() - Math.random() * (currentTime.getTime() - lastDate.getTime())
						);
					} else {
						projectId = Math.floor(Math.random() * 10000000 + 1);
						lastProjectId = projectId;
						randomDate = faker.date.recent(90);
						lastDate = randomDate;
						parentId = 0;
						lastCommentId = count + 1;
					}
					count++;

					rs.push(
						projectId +
							'\t' +
							parentId +
							'\t' +
							authorId +
							'\t' +
							faker.lorem.sentences(faker.random.number({ min: 1, max: 7 })) +
							'\t' +
							randomDate.toUTCString() +
							'\n'
					);
				}
			}
		});

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
