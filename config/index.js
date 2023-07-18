require('dotenv/config');
const {env} = process;

const config = {
    port: +env.PORT,
    key: env.JWT_SECRET_KEY
}

module.exports = config;