require('dotenv/config');
const {port} = require('../../config');

const run = (app) => {app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})
};

module.exports = run;