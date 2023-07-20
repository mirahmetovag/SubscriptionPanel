const {sign, verify} = require('../../libs/jwt');
const {fetchOne} = require('../../libs/pg');

const isActive = async (req,res,next) => {
    try {
        const user = req.user;
        const {channel_id} = req.params;
        
        // var vacationStart = new Date(availableDate);
        // var vacationEnd = new Date (vacationStart); 
        // vacationEnd.setDate(vacationEnd.getDate() + availableDays);
        // new Date (tour.date) >= vacationStart && new Date (new Date (tour.date)).setDate(new Date (new Date (tour.date)).getDate() + tour.duration) <= vacationEnd;
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = isActive;