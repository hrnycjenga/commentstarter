const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const router = require(path.resolve(__dirname, 'router.js'));
const cors = require('cors');

app.use(parser.json());
app.use(cors());
app.use('/:projId', express.static(path.join(__dirname, '/../client/dist')));
app.use('/static', express.static(path.join(__dirname, '/../client/dist/static')));

let port = 3011;

// app.get('/static', path.join(__dirname, '/../client/dist/static'));

app.use('/', router);

app.listen(port, () => {
	console.log(`✅ Express server is listening on port ${port}`);
});
