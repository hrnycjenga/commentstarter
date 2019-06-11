const router = require('express').Router();
const path = require('path');

const controller = require(path.resolve(__dirname, 'controller.js'));

const redirect = (req, res) => {
	res.redirect('/1');
};

router.get('/user/:userId', controller.getUserMessages);
router.get('/:projId/messages', controller.getMessages);
router.get('/', redirect);
//!! No point in doing get replies - easier to just retrieve all messages for a project
//!! and filter client-side
// router.get('/message/:messageId/replies', controller.getRepliesToComment);
// router.get('/:projId/newmessage', controller.getNewestComment);
// router.get('/:projId/newreply', controller.getNewestReply);
// router.post('/:projId/messages', controller.addNewComment);
// router.post('/:projId/reply/:messageId', controller.addNewReply);

module.exports = router;
