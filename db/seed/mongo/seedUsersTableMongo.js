const mongo = require('mongodb').MongoClient;
const faker = require('faker');
const mongoHost = process.env.MONGOHOST || 'localhost';
const mongoPort = process.env.MONGOPORT || '27017';
const mongoUser = process.env.MONGOUSER || '';
const mongoPassword = process.env.MONGOPASSWORD || '';
const mongoDatabase = process.env.MONGODATABASE || 'punch';
const seedCount = +process.env.SEEDCOUNT || 1000000;
const iterations = +process.env.ITERATIONS || 1;
let count;

const seedTable = async function() {
	const mongoUrl =
		'mongodb://' + (mongoUser ? mongoUser + ':' + mongoPassword + '@' : '') + mongoHost + ':' + mongoPort;

	console.time('seedTime');
	console.log(`🚀 Attempt to connect to database ${mongoDatabase} at ${mongoHost}:${mongoPort} as ${mongoUser}`);
	let currentIteration = 0;
	try {
		const client = await mongo.connect(mongoUrl, { useNewUrlParser: true });
		const db = await client.db(mongoDatabase);
		const startingCount = await db.collection('users').countDocuments();

		count = startingCount;
		console.log('Output: count', count);

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
						performInsert();
					} else {
						client.close();
					}
				}
			});
		}
		performInsert();
	} catch (err) {
		return new Error(err);
	}
};

seedTable()
	.then(() => {
		console.log(' 🚩 All insertions sent to database');
	})
	.catch((err) => {
		console.error(`🚫 Seeding failed with error: ${err}`);
	});

process.on('exit', () => {
	console.timeEnd('seedTime');
});
