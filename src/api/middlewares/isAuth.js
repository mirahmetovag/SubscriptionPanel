const {sign, verify} = require('../../libs/jwt');
const {fetchOne} = require('../../libs/pg');

const isAuth = async (req,res,next) => {
    try {
        const {token} = req.cookies;
        if (!token) return res.status(400).json({message:'token does not exist'});
        const user_id = verify(token);
        if(!user_id) return res.status(400).json({message:'token is invalid'});
        const findUser = await fetchOne('SELECT * FROM users WHERE user_id=$1', user_id);
        if(!findUser) return res.status(400).json({message:'user is not found'});
        req.user = findUser;
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = isAuth;