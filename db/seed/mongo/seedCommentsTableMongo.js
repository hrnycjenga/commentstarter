const mongo = require('mongodb').MongoClient;
const faker = require('faker');
const mongoHost = process.env.MONGOHOST || 'localhost';
const mongoPort = process.env.MONGOPORT || '27017';
const mongoUser = process.env.MONGOUSER || '';
const mongoPassword = process.env.MONGOPASSWORD || '';
const mongoDatabase = process.env.MONGODATABASE || 'punch';
const seedCount = +process.env.SEEDCOUNT || 1000000;
const iterations = +process.env.ITERATIONS || 1;

const seedTable = async function() {
	const mongoUrl =
		'mongodb://' + (mongoUser ? mongoUser + ':' + mongoPassword + '@' : '') + mongoHost + ':' + mongoPort;

	console.time('seedTime');
	let currentIteration = 0;
	try {
		const client = await mongo.connect(mongoUrl, { useNewUrlParser: true });
		console.log(`🚀 Connected to ${mongoHost}:${mongoPort} as ${mongoUser}`);
		console.log(`🌳 Attempt to seed ${seedCount} records x ${iterations} times`);

		const db = await client.db(mongoDatabase);
		let startingCount = await db.collection('comments').countDocuments();

		let count = startingCount;
		let currentTime = new Date();

		const performInsert = () => {
			let comments = [];
			currentIteration++;
			console.log(`✈️  Iteration #${currentIteration}`);
			let lastCommentId, parentId, authorId, projectId, lastProjectId, randomDate, lastDate, randomNum;

			for (let i = seedCount; i--; ) {
				count++;

				randomNum = Math.random() * 10;
				authorId = Math.floor(Math.random() * 20000000 + 1);
				commentBody = faker.lorem.sentences(faker.random.number({ min: 1, max: 7 }));

				if (randomNum > 5 && count > startingCount + 1) {
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
					lastCommentId = count;
				}

				comments.push({
					_id: count,
					projectId,
					parentId,
					authorId,
					commentBody,
					created: randomDate.toUTCString()
				});
			}

			return db.collection('comments').insertMany(comments, (err, res) => {
				if (err) {
					console.error(`🚫 Failed insertion with error: ${err}`);
					client.close();
				} else {
					console.log(`   Iteration #${currentIteration} complete 🎊`);
					if (currentIteration < iterations) {
						startingCount += seedCount;
						performInsert();
					} else {
						console.log('🚩 All insertions sent to database');
						client.close();
					}
				}
			});
		};
		return performInsert();
	} catch (err) {
		throw new Error(err);
	}
};

seedTable().catch((err) => {
	console.error(`🚫 Seeding failed with error: ${err}`);
});

process.on('exit', () => {
	console.timeEnd('seedTime');
});
