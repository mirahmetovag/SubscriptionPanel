const {hash,compare} = require('bcrypt');

const hashPass = async(payload) => await hash(payload, 10);
const comparePass = async(payload, hashedPass) =>  await compare(payload, hashedPass);

module.exports = {
    hashPass,
    comparePass
};