const { Pool } = require('pg');
const faker = require('faker');

const pgHost = process.env.PGHOST || 'localhost';
const pgUser = process.env.PGUSER || 'punchcomments';
const pgDatabase = process.env.PGDATABASE || 'punch';
const pgPassword = process.env.PGPASSWORD || 'password';
const pgPort = process.env.PGPORT || 5432;

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

	const stream = client.query(
		copyFrom('COPY comments (project_id,parent_id,author_id,comment_body,created_at) FROM STDIN')
	);

	let count = 0;
	let lastCommentId, parentId, authorId, projectId, lastProjectId, randomDate, lastDate, randomNum;
	let currentTime = new Date();

	const rs = new Readable({
		read() {
			if (count >= 1000000) {
				rs.push(null);
			} else {
				randomNum = Math.random() * 10;
				authorId = Math.floor(Math.random() * 20000000 + 1);

				if (randomNum > 5 && count > 0) {
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
				count++;
			}
		}
	});

	// rs._read = () => {
	// 	if (count >= 1000000) {
	// 		rs.push(null);
	// 	} else {
	// 		randomNum = Math.random() * 10;
	// 		authorId = Math.floor(Math.random() * 20000000 + 1);

	// 		if (randomNum > 5 && count > 0) {
	// 			projectId = lastProjectId;
	// 			parentId = lastCommentId;
	// 			randomDate = new Date(
	// 				currentTime.getTime() - Math.random() * (currentTime.getTime() - lastDate.getTime())
	// 			);
	// 		} else {
	// 			projectId = Math.floor(Math.random() * 10000000 + 1);
	// 			lastProjectId = projectId;
	// 			randomDate = faker.date.recent(90);
	// 			lastDate = randomDate;
	// 			parentId = 0;
	// 			lastCommentId = count + 1;
	// 		}

	// 		rs.push(
	// 			projectId +
	// 				'\t' +
	// 				parentId +
	// 				'\t' +
	// 				authorId +
	// 				'\t' +
	// 				faker.lorem.sentences(faker.random.number({ min: 1, max: 7 })) +
	// 				'\t' +
	// 				randomDate.toUTCString() +
	// 				'\n'
	// 		);
	// 		count++;
	// 	}
	// };

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
