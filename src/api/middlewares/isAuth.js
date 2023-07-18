const jwt = require('../../../config');
const {fetchOne} = require('../../libs/pg');

const isAuth = async (res,req,next) => {
    try {
        const {token} = req.cookes;
        if (!token) return 'token does not exist';
        const {user_id} = jwt.verify(token);
        if(!user_id) return 'token is invalid';

        const findUser = await fetchOne("SELECT * FROM users WHERE user_id=$1", user_id);
        if(!findUser) return 'user is not found'

        req.user = findUser;
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = isAuth;