const path = require('path');
const controller = require(path.resolve(__dirname, 'controller.js'));
const Router = require('koa-router');
const router = new Router();

const redirect = (ctx) => {
	ctx.redirect('/1');
};

// router.get('/static', serve(path.join(__dirname, '../client/dist/static')));

// router.get('/:projId', async (ctx) => {
// 	await send(ctx, path.join(__dirname, '../client/dist/index.html'));
// });
router.get('/user/:userId', controller.getUserMessages);
router.get('/:projId/messages', controller.getMessages);
router.post('/message', controller.addComment);
router.get('/', redirect);

module.exports = router;
