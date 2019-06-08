const csv = require('fast-csv');
const faker = require('faker');
const fs = require('fs');
const path = require('path');
let count = 0;
let write = true;

const csvStream = csv.createWriteStream();
const writableStream = fs.createWriteStream(path.join(__dirname, './users.csv'));
const seedCount = process.env.SEEDCOUNT || 1000000;

console.log(`🚀 Attempt to write ${seedCount} records to csv`);
console.time('writeTime');

writableStream.on('finish', function() {
	console.log('Users csv generated');
	console.timeEnd('writeTime');
});

while (count < seedCount) {
	if (write) {
		write = csvStream.write([
			[
				faker.name.firstName(),
				faker.name.lastName(),
				faker.internet.email(),
				faker.internet.avatar(),
				faker.date.recent(90).toUTCString()
			]
		]);
		count++;
	} else {
		console.log(`Wrote ${count} rows`);
		csvStream.end();
		csvStream.pipe(writableStream);
	}
}

csvStream.pipe(writableStream);
csvStream.end();
