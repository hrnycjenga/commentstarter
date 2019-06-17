// const router = require('express').Router();
const path = require('path');

const controller = require(path.resolve(__dirname, 'controller.js'));

const redirect = (req, res) => {
	res.redirect('/1');
};

async function routes(fastify, options) {
	fastify.get('/loaderio-56582af744312c30cb867d96e424fafe/', (req, res) => {
		res.sendFile('loaderio-56582af744312c30cb867d96e424fafe.txt');
	});
	fastify.get('/bundle.js', (req, res) => {
		res.sendFile('bundle.js');
	});
	fastify.get('/:projId', (req, res) => {
		res.sendFile('index.html');
	});
	fastify.get('/user/:userId', controller.getUserMessages);
	fastify.get('/:projId/messages', controller.getMessages);
	fastify.post('/message', controller.addComment);
	fastify.get('/', redirect);
}

module.exports = routes;
