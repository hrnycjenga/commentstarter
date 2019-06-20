const faker = require('faker');
const fs = require('fs');
const path = require('path');
const Readable = require('stream').Readable;
const { convertArrayToCSV } = require('convert-array-to-csv');

let count = 0;

const writableStream = fs.createWriteStream(path.join(__dirname, './users.csv'));
const seedCount = process.env.SEEDCOUNT || 1000000;

console.log(`🚀 Attempt to write ${seedCount} records to csv`);
console.time('writeTime');

writableStream.on('finish', function() {
	console.log('Users csv generated');
	console.timeEnd('writeTime');
});

const rs = new Readable({
	read() {
		if (count >= seedCount) {
			rs.push(null);
		} else {
			rs.push(
				convertArrayToCSV([
					[
						faker.name.firstName(),
						faker.name.lastName(),
						faker.internet.email(),
						faker.internet.avatar(),
						faker.date.recent(90).toISOString()
					]
				])
			);
			count++;
		}
	}
});

let onError = (strErr) => {
	console.error('Something went wrong:', strErr);
	done();
};

rs.on('error', onError);

rs.pipe(writableStream);
