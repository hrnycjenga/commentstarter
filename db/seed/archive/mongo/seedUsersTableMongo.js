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
		let startingCount = await db.collection('users').countDocuments();

		let count = startingCount;

		function performInsert() {
			let users = [];
			currentIteration++;
			console.log(`✈️  Iteration #${currentIteration}`);

			for (let i = seedCount; i--; ) {
				count++;
				users.push({
					_id: count,
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					email: faker.internet.email(),
					avatar: faker.internet.avatar(),
					created: faker.date.recent(90).toUTCString()
				});
			}

			db.collection('users').insertMany(users, (err, res) => {
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
		}
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
