const { createChannel, deleteChannel, getAllAvailableChannels, getAllUserSubscribedChannels, updateChannelInfo, putMoneyOnChannelBalance, buySubscriptionForChannel,getAllSubscriptionsForChannel } = require('../controllers/channel.controller');

const router = require('express').Router();

router.post('/channel', createChannel);
router.put('/channel', updateChannelInfo);
router.delete('/channel', deleteChannel);
router.get('/channels', getAllAvailableChannels);
router.get('/channels/:user_id', getAllUserSubscribedChannels);
router.put('/channel/balance', putMoneyOnChannelBalance);
router.post('/channel/subscribe', buySubscriptionForChannel);
router.get('/channel/subscribtions/:channel_id', getAllSubscriptionsForChannel);

module.exports = router;