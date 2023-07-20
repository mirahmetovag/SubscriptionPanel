const {sign, verify} = require('../../libs/jwt');
const {fetchOne} = require('../../libs/pg');

const isActive = async (req,res,next) => {
    try {
        const user = req.user;
        const {channel_id} = req.params;
        const isMember = await fetchOne('SELECT * FROM members WHERE user_id = $1 AND channel_id = $2', user.user_id, channel_id);
        if(!isMember || isMember.isActive === false) return res.status(403).json({message: 'You have to pay to subscribe the channel'});
        const currentSubscription = await fetchOne(`SELECT * FROM subscriptions WHERE user_id = $1 AND channel_id = $2`, user.user_id, channel_id);
        const startDate = currentSubscription.started_at;
        const endDate = new Date (startDate.setDate(startDate.getDate() + currentSubscription.duration));
        const difference = endDate - Date.now();
        if(difference <= 0) {
            await fetchOne('UPDATE members SET isActive=$1 WHERE channel_id=$2 AND user_id=$3', false, channel_id, user_id);
            return res.status(403).json({message: 'Subscription time is up. Please, subscribe again'});
        };
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = isActive;