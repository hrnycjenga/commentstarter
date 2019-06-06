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
	// return client.query(`SELECT project_id, created_at FROM comments WHERE id = 50000`).then((res) => {
	// 	console.log(res);
	// });

	let done = () => {
		client.release();
	};

	const stream = client.query(
		copyFrom('COPY comments (project_id,parent_id,author_id,comment_body,created_at) FROM STDIN')
	);

	let count = 0;

	const rs = new Readable({
		read() {
			if (count >= 10) {
				rs.push(null);
			} else {
				const parentId = faker.random.number({ min: 1, max: 10000000 });
				let parentProjectId;
				let parentCreateAt;

				console.log('hello');

				client
					.query(`SELECT project_id, created_at FROM comments WHERE id = ${parentId}`)
					.then((res) => {
						console.log(res.rows[0]);
						parentProjectId = res.rows[0].project_id;
						parentCreateAt = res.rows[0].created_at;
						rs.push(
							parentProjectId +
								'\t' +
								parentId +
								'\t' +
								faker.random.number({ min: 1, max: 20000000 }) +
								'\t' +
								faker.lorem.sentences(faker.random.number({ min: 1, max: 7 })) +
								'\t' +
								faker.date.between(parentCreateAt, '2019-06-01') +
								'\n'
						);
						count++;
					})
					.catch((e) => {
						throw e;
					});
			}
		}
	});

	// rs._read = () => {
	// 	if (count >= 10) {
	// 		rs.push(null);
	// 	} else {
	// 		const parentId = faker.random.number({ min: 1, max: 10000000 });
	// 		let parentProjectId;
	// 		let parentCreateAt;

	// 		console.log('hello');

	// 		client
	// 			.query(`SELECT project_id, created_at FROM comments WHERE id = ${parentId}`)
	// 			.then((res) => {
	// 				console.log(res.rows[0]);
	// 				parentProjectId = res.rows[0].project_id;
	// 				parentCreateAt = res.rows[0].created_at;
	// 				rs.push(
	// 					parentProjectId +
	// 						'\t' +
	// 						parentId +
	// 						'\t' +
	// 						faker.random.number({ min: 1, max: 20000000 }) +
	// 						'\t' +
	// 						faker.lorem.sentences(faker.random.number({ min: 1, max: 7 })) +
	// 						'\t' +
	// 						faker.date.between(parentCreateAt, '2019-06-01') +
	// 						'\n'
	// 				);
	// 				count++;
	// 			})
	// 			.catch((e) => {
	// 				throw e;
	// 			});
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
