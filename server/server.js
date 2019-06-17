const Koa = require('koa');
const app = new Koa();
const path = require('path');
const bodyParser = require('koa-bodyparser');
const router = require(path.resolve(__dirname, 'router.js'));
const cors = require('@koa/cors');
const port = process.env.PORT || 3011;
const mount = require('koa-mount');
const serve = require('koa-static');

app.use(bodyParser());
app.use(cors());
// app.get('/loaderio-56582af744312c30cb867d96e424fafe', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../loaderio-56582af744312c30cb867d96e424fafe.txt'));
// });
app.use(mount('/static', serve(path.join(__dirname, '../client/dist/static'))));

app.use(router.routes());

app.listen(port, () => {
	console.log(`✅ Comments component server - Koa - listening on port ${port}`);
});
