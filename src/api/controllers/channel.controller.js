const {verify} = require('../../libs/jwt');
const {fetch, fetchOne} = require('../../libs/pg');

const createChannel = async (req,res) => {
    const {name, description, subscriptionPrice} = req.body;
    const owner_id = req.user.user_id;
    await fetchOne('INSERT INTO channels (name,description,subscriptionPrice,owner_id) values ($1,$2,$3,$4)', name, description, subscriptionPrice, owner_id);
    res.status(201).json({message: 'Channel was successfully created'});
};

const updateChannelInfo = async (req,res) => {
    const {name, description, subscriptionPrice} = req.body;
    const channel_id = req.params;
    await fetchOne('UPDATE channels SET name = $1, description =$2,subscriptionPrice=$3 where channel_id = $4', name, description, subscriptionPrice, channel_id);
    res.status(200).json({message: 'Channel was successfully updated'});
};   


const deleteChannel = async (req,res) => {
    const channel_id = req.params;
    await fetchOne('DELETE FROM channels WHERE channel_id = $1', channel_id);
    res.status(200).json({message:'Channel was successfully deleted'});
};

const getAllAvailableChannels = async (req,res) => {
    const data = await fetch('SELECT name, description FROM channels');
    res.status(200).json({message: 'List was formed', data});
};

const getAllUserSubscribedChannels = async (req,res) => {
    const data = await fetch('SELECT channels.name AS channel FROM members JOIN users USING (channel_id) WHERE user_id = $1', req.user.user_id);
    res.status(200).json({message:'Your subscription list was successfully created', data});
};

const buySubscriptionForChannel = async (req,res) => {

};

const getAllSubscriptionsForChannel = async (req,res) => {
    const channel_id = req.params;
    const data = await ('SELECT username AS subscriber FROM users JOIN members USING user_id WHERE channel_id = $1, isActive = true', channel_id);
    res.status(200).json({message: 'The list of your subscribers was formed', data})
};

module.exports = {
    createChannel,
    updateChannelInfo,
    deleteChannel,
    getAllAvailableChannels,
    getAllUserSubscribedChannels,
    buySubscriptionForChannel,
    getAllSubscriptionsForChannel
}