const {sign, verify} = require('../../libs/jwt');
const {hashPass, comparePass} = require('../../libs/bcrypt');
const {fetch, fetchOne} = require('../../libs/pg');

const register = async (req,res) => {
    try {
        const {username, password} = req.body;
    const findUser = await fetchOne ('Select * from users where username=$1', username);
    if (findUser) {
        return res.status(409).json({message: 'Username is already taken'});
    }
    const hashedPass = await hashPass(password);
    console.log(hashedPass);
    const newUser = await fetchOne('insert into users (username, password) values ($1,$2) returning*', username, hashedPass);
    const token = sign (newUser.user_id);

    res.cookie('token',token);
    res.status(201).json({message:'Successfully created', token});
    } catch (error) {
        console.log(error);
    }
};

const login = async (req,res) => {
    try {
        const {username, password} = req.body;
        const findUser = await fetchOne("SELECT * FROM users WHERE username=$1;", username);
        if(!findUser){
            return res.status(404).json({message:'Username or password is invalid'})
        };
        const comparedPass = await comparePass(password, findUser.password);
        if(!comparedPass){
            return res.status(404).json({message:'Username or password is invalid'})
        };
        const token = sign(findUser.user_id);
        res.cookie("token", token);
        res.status(200).json({message: 'You are successfully logged in'});
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    register,
    login,
}