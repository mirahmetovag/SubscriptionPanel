const {fetch, fetchOne} = require('../../libs/pg');

const createChannel = async (req,res) => {
    const {name, description, subscription_price, subscription_duration} = req.body;
    const owner_id = req.user.user_id;
    await fetchOne('INSERT INTO channels (name,description,subscription_price, subscription_duration, owner_id) values ($1,$2,$3,$4,$5)', name, description, subscription_price, subscription_duration, owner_id);
    res.status(201).json({message: 'Channel was successfully created'});
};

const updateChannelInfo = async (req,res) => {
    const {name, description, subscription_price, subscription_duration} = req.body;
    const {channel_id} = req.params;
    await fetchOne('UPDATE channels SET name = $1, description =$2,subscription_price=$3, subscription_duration=$4 where channel_id = $5', name, description, subscription_price, subscription_duration, channel_id);
    res.status(200).json({message: 'Channel was successfully updated'});
};   


const deleteChannel = async (req,res) => {
    const {channel_id} = req.params;
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
    const {channel_id} = req.params;
    const user = req.user;
    const channel = await fetchOne('SELECT * FROM channels WHERE channel_id = $1', channel_id);
    const ownerAccount = await fetchOne('SELECT * FROM bankAccounts WHERE user_id = $1', channel.owner_id);
    console.log(ownerAccount);
    const isMember = await fetchOne('SELECT * FROM members where channel_id = $1 and user_id = $2', channel_id, user.user_id);
    if(isMember) { 
        if (isMember.balance < channel.subscription_price) {
        return res.status(409).json({message: 'There is not enough money. Fill your balance'});
    }
    try {
        await fetchOne('BEGIN TRANSACTION');
        await fetchOne('UPDATE members SET balance = balance - $1 WHERE member_id = $2', channel.subscription_price, isMember.member_id);
        await fetchOne('UPDATE bankAccounts SET balance = balance + $1 WHERE account_id = $2', channel.subscription_price, ownerAccount.account_id);
        await fetchOne('INSERT INTO transactions (account_id, transactionType, amount) VALUES ($1,$2,$3)', ownerAccount.account_id, 'put', channel.subscription_price);
        await fetchOne('INSERT INTO subscriptions (user_id, channel_id, duration) VALUES ($1,$2,$3)', user.user_id, channel.channel_id, channel.subscription_duration);
        await fetchOne('UPDATE members SET isActive = $1 WHERE member_id = $2', true, isMember.member_id);
        await fetchOne('COMMIT');
        return res.status(200).json({message:'Subscription was bought'});
    } catch (error) {
        await fetchOne('ROLLBACK');
        console.log(error);
        // res.status(400).json({message: 'Transaction did not go through'});
    }} else {
        await fetchOne('INSERT INTO members (channel_id, user_id) VALUES ($1,$2)', channel_id, user.user_id);
        res.status(201).json({message:'Now you are allowed to buy a subscription. Please, fill your balance to buy a subscription'});
    } 
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