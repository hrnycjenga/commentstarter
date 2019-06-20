const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const copyFrom = require('pg-copy-streams').from;

const pgHost = process.env.PGHOST || 'localhost';
const pgUser = process.env.PGUSER || 'punchcomments';
const pgDatabase = process.env.PGDATABASE || 'punch';
const pgPassword = process.env.PGPASSWORD || 'password';
const pgPort = process.env.PGPORT || 5432;
var running = true;

console.log(`🚀 Attempt to seed csv to database ${pgDatabase} at ${pgHost}:${pgPort}`);

console.time('seedTime');
const seedDb = () => {
	console.log(`✈️  Starting CSV copy`);

	const pool = new Pool({
		user: pgUser,
		host: pgHost,
		database: pgDatabase,
		password: pgPassword,
		port: pgPort
	});

	pool.connect().then((client) => {
		let done = () => {
			console.log(`   CSV copy to table complete 🎊`);
			client.release();
			running = false;
		};

		let onError = (strErr) => {
			console.error('Something went wrong:', strErr);
			done();
		};

		var stream = client.query(
			copyFrom('COPY users (first_name,last_name,email,avatar_url,created_at) FROM STDIN CSV')
		);
		var fileStream = fs.createReadStream(path.join(__dirname, './users.csv'));
		fileStream.on('error', onError);
		stream.on('error', onError);
		stream.on('end', done);
		fileStream.pipe(stream);
	});
};

seedDb();

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
		setTimeout(memlog, 1000);
	}
};

memlog();

process.on('exit', () => {
	console.timeEnd('seedTime');
});
