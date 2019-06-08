const csv = require('fast-csv');
const faker = require('faker');
const fs = require('fs');
const path = require('path');

const csvStream = csv.createWriteStream();
const writableStream = fs.createWriteStream(path.join(__dirname, './users.csv'));
const seedCount = process.env.SEEDCOUNT || 1000000;

console.log(`🚀 Attempt to write ${seedCount} records to csv`);
console.time('writeTime');

writableStream.on('finish', function() {
	console.log('Users csv generated');
	console.timeEnd('writeTime');
});

csvStream.pipe(writableStream);

for (let i = 0; i < seedCount; i++) {
	csvStream.write([
		[
			faker.name.firstName(),
			faker.name.lastName(),
			faker.internet.email(),
			faker.internet.avatar(),
			faker.date.recent(90).toUTCString()
		]
	]);
}

csvStream.end();
