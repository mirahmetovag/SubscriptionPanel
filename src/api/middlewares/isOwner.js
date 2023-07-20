const {sign, verify} = require('../../libs/jwt');
const {fetchOne} = require('../../libs/pg');

const isOwner = async (req,res,next) => {
    try {
        const {channel_id} = req.params;
        const user = req.user;
        const findChannel = await fetchOne('SELECT * FROM channels WHERE channel_id = $1', channel_id);
        if (user.user_id = findChannel.owner_id) {
            next();
        } else {
            return res.status(409).json({message: 'You are not allowed to update this group'});
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = isOwner;