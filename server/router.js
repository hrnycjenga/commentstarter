const router = require('express').Router();
const path = require('path');

const controller = require(path.resolve(__dirname, 'controller.js'));

router.get('/user/:userId', controller.getUserMessages);
router.get('/:projId/messages', controller.getMessages);
// router.get('/:projId/newmessage', controller.getNewestComment);
// router.get('/:projId/newreply', controller.getNewestReply);
router.get('/:projId/:messageId/replies', controller.getRepliesToComment);
// router.post('/:projId/messages', controller.addNewComment);
// router.post('/:projId/reply/:messageId', controller.addNewReply);

module.exports = router;
