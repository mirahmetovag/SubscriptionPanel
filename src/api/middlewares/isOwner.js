const {sign, verify} = require('../../libs/jwt');
const {fetchOne} = require('../../libs/pg');

const isOwner = async (req,res,next) => {
    try {
        const {token} = req.cookies;
        if (!token) return res.status(400).json({message:'token does not exist'});
        const user_id = verify(token);
        if(!user_id) return res.status(400).json({message:'token is invalid'});
        const findUser = await fetchOne('SELECT * FROM users WHERE user_id=$1', user_id);
        if(!findUser) return res.status(400).json({message:'user is not found'});
        const {channel_id} = req.params;
        const findChannel = await fetchOne('SELECT * FROM channels WHERE channel_id = $1', channel_id);
        if (user_id = findChannel.channel_id) {
            next();
        } else {
            return res.status(409).json({message: 'You are not allowed to update this group'});
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = isOwner;