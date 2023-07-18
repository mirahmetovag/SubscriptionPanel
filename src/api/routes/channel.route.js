const { createChannel, updateChannel, deleteChannel, getChannel } = require('../controllers/channel.controller');

const router = require('express').Router();

router.post('/channel', createChannel);
router.put('/channel', updateChannel);
router.delete('/channel', deleteChannel);
router.get('/channel', getChannel);

module.exports = router;