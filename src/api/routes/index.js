const auth = require('./auth.route');
const bank = require('./bank.route');
const channel = require('./channel.route');
const posts = require('./posts.route');

module.exports = [auth, bank, channel, posts];