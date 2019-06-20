// const router = require('express').Router();
const path = require('path');

const controller = require(path.resolve(__dirname, 'controller.js'));

const redirect = (req, res) => {
	res.redirect('/1');
};

async function routes(fastify, options) {
	fastify.get('/loaderio-f07096fe3a1bada2f68910dc5d8eb2a4/', (req, res) => {
		res.sendFile('loaderio-f07096fe3a1bada2f68910dc5d8eb2a4.txt');
	});
	fastify.get('/loaderio-b7eb5c67a947712e79e639c63b547f3b/', (req, res) => {
		res.sendFile('loaderio-b7eb5c67a947712e79e639c63b547f3b.txt');
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
