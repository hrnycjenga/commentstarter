const fastify = require('fastify')();
const path = require('path');
const port = process.env.PORT || 3011;

fastify.register(require('fastify-cors'));
fastify.register(require('fastify-static'), {
	root: path.join(__dirname, '../client/dist/static'),
	prefix: '/static/',
	decorateReply: false
});
fastify.register(require('fastify-static'), {
	root: path.join(__dirname, '../client/dist/'),
	prefix: '/'
});
fastify.register(require(path.resolve(__dirname, 'router.js')));

const start = async () => {
	try {
		console.log(`✅ Comments component server - fastify - listening on port ${port}`);
		await fastify.listen(port);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
