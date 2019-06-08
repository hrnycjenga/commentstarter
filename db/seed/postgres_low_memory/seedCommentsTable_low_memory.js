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
let startingRow;
let running = true;
let client;

console.log(`🚀 Attempt to seed ${seedCount} records to database ${pgDatabase} at ${pgHost}:${pgPort}`);

const pool = new Pool({
	user: pgUser,
	host: pgHost,
	database: pgDatabase,
	password: pgPassword,
	port: pgPort
});

console.time('seedTime');

const seedDb = () => {
	let count = startingRow;
	let lastCommentId, parentId, authorId, projectId, lastProjectId, randomDate, lastDate, randomNum;
	let currentTime = new Date();
	let done = () => {
		console.log(`   Seeding complete 🎊`);
		client.release();
		running = false;
	};
	let onError = (strErr) => {
		console.error('Something went wrong:', strErr);
		done();
	};

	const stream = client.query(
		copyFrom('COPY comments (project_id,parent_id,author_id,comment_body,created_at) FROM STDIN', {
			highWaterMark: 104857600
		})
	);

	const rs = new Readable({
		read() {
			if (count >= seedCount) {
				rs.push(null);
			} else {
				if (count % 100000 === 0) {
					console.log(`🥅 Streamed ${count} records`);
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

				function pushData({ projectId, parentId, authorId, randomDate }) {
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

				setImmediate(pushData, { projectId, parentId, authorId, randomDate });
			}
		},
		highWaterMark: 104857600
	});

	console.log(`✈️  Seeding starting with row ${startingRow}`);
	// console.log('read hwm', rs.readableHighWaterMark);
	// console.log('write hwm', stream.writableHighWaterMark);
	rs.on('error', onError);
	stream.on('error', onError);
	stream.on('end', done);
	rs.pipe(stream);
};

var rssMin = process.memoryUsage().rss / 1024 / 1024;
var rssMax = rssMin;

memlog = function() {
	var rss = process.memoryUsage().rss / 1024 / 1024;
	rssMin = Math.min(rss, rssMin);
	rssMax = Math.max(rss, rssMax);
	console.log(
		'rss:' +
			Math.round(rss * 100) / 100 +
			'MB rssMin:' +
			Math.round(rssMin * 100) / 100 +
			'MB rssMax:' +
			Math.round(rssMax * 100) / 100 +
			'MB'
	);
	if (running) {
		setTimeout(memlog, 10000);
	}
};

const initialize = async () => {
	try {
		client = await pool.connect();
		let result = await client.query('SELECT COUNT(*) FROM comments;');
		startingRow = result.rows[0].count;
	} catch (err) {
		console.log(`Connection error: `, err);
	}

	seedDb();
};

memlog();
initialize();

process.on('exit', () => {
	console.timeEnd('seedTime');
});
