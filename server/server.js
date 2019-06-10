const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const router = require(path.resolve(__dirname, 'router.js'));

app.use(parser.json());
app.use('/:projId', express.static(path.join(__dirname, '/../client/dist')));

let port = 3011;

app.use('/', router);

app.listen(port, () => {
	console.log(`✅ Express server is listening on port ${port}`);
});
