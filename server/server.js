try {
	require('newrelic');
} catch (err) {
	console.log(err);
}
const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const router = require(path.resolve(__dirname, 'router.js'));
const cors = require('cors');
const port = process.env.PORT || 3011;

app.use(parser.json());
app.use(cors());
app.get('/loaderio-56582af744312c30cb867d96e424fafe', (req, res) => {
	res.sendFile(path.join(__dirname, '../loaderio-56582af744312c30cb867d96e424fafe.txt'));
});
app.get('/bundle.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/dist/bundle.js'));
});
app.get('/:projId', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
app.use('/static', express.static(path.join(__dirname, '../client/dist/static')));

app.use('/', router);

app.listen(port, () => {
	console.log(`✅ Comments component server listening on port ${port}`);
});
