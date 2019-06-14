const router = require('express').Router();
const path = require('path');

const controller = require(path.resolve(__dirname, 'controller.js'));

const redirect = (req, res) => {
	res.redirect('/1');
};

router.get('/user/:userId', controller.getUserMessages);
router.get('/:projId/messages', controller.getMessages);
router.post('/message', controller.addComment);
router.get('/', redirect);

module.exports = router;
