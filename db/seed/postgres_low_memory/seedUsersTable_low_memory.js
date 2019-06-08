const { Pool } = require('pg');
const faker = require('faker');

const pgHost = process.env.PGHOST || 'localhost';
const pgUser = process.env.PGUSER || 'punchcomments';
const pgDatabase = process.env.PGDATABASE || 'punch';
const pgPassword = process.env.PGPASSWORD || 'password';
const pgPort = process.env.PGPORT || 5432;
const logMemory = process.env.LOGMEMORY || true;

const copyFrom = require('pg-copy-streams').from;
const Readable = require('stream').Readable;
const seedCount = +process.env.SEEDCOUNT || 1000000;
let running = true;
let client;

const pool = new Pool({
	user: pgUser,
	host: pgHost,
	database: pgDatabase,
	password: pgPassword,
	port: pgPort
});

console.time('seedTime');

const seedDb = () => {
	let count = 0;
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
		copyFrom('COPY users (first_name,last_name,email,avatar_url,created_at) FROM STDIN', {
			highWaterMark: 104857600
		})
	);

	const rs = new Readable({
		read() {
			if (count >= seedCount) {
				rs.push(null);
			} else {
				if (count % 100000 === 0 && count > 0) {
					console.log(`🥅 Streamed ${count} records`);
				}
				count++;
				setImmediate(function() {
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
				});
			}
		},
		highWaterMark: 104857600
	});

	console.log(`✈️  Seeding starting`);
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
	} catch (err) {
		console.log(`Connection error: `, err);
	}

	console.log(
		`🚀 Connected: attempting to seed ${seedCount} records to database ${pgDatabase} at ${pgHost}:${pgPort}`
	);
	seedDb();
};

if (logMemory) {
	memlog();
}
initialize();

process.on('exit', () => {
	console.timeEnd('seedTime');
});
