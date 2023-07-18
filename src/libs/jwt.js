const jwt = require('jsonwebtoken');
const config = require('../../config');

const sign = (payload) => jwt.sign(payload, config.key);
const verify = (payload) => jwt.verify(payload, config.key);

module.exports = {
    sign,
    verify
};