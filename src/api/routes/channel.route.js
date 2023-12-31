const { createChannel, deleteChannel, getAllAvailableChannels, getAllUserSubscribedChannels, updateChannelInfo, buySubscriptionForChannel,getAllSubscriptionsForChannel } = require('../controllers/channel.controller');
const isAuth = require('../middlewares/isAuth');
const isOwner = require('../middlewares/isOwner');
const router = require('express').Router();

router.post('/channel', isAuth, createChannel);
router.put('/channel/info/:channel_id', isAuth , isOwner, updateChannelInfo);
router.delete('/channel/:channel_id', isAuth, isOwner, deleteChannel);
router.get('/channels', getAllAvailableChannels);
router.get('/channels/ownlist', isAuth, getAllUserSubscribedChannels);
router.post('/channel/subscribe/:channel_id', isAuth, buySubscriptionForChannel);
router.get('/channel/subscribtions/:channel_id', isAuth, isOwner, getAllSubscriptionsForChannel);

module.exports = router;