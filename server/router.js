const path = require('path');
const controller = require(path.resolve(__dirname, 'controller.js'));
const Router = require('koa-router');
const router = new Router();
const send = require('koa-send');
const serve = require('koa-static');

const redirect = (ctx) => {
	ctx.redirect('/1');
};

router.get('/loaderio-56582af744312c30cb867d96e424fafe', async (ctx) => {
	await send(ctx, 'loaderio-56582af744312c30cb867d96e424fafe.txt', { root: path.join(__dirname, '../') });
});
router.get('/bundle.js', async (ctx) => {
	await send(ctx, 'bundle.js', { root: path.join(__dirname, '../client/dist') });
});
router.get('/:projId', async (ctx) => {
	await send(ctx, 'index.html', { root: path.join(__dirname, '../client/dist') });
});
// router.get('/user/:userId', controller.getUserMessages);
router.get('/:projId/messages', controller.getMessages);
router.post('/message', controller.addComment);
router.get('/', redirect);

module.exports = router;
