const rekuire = require('rekuire');
const Moment  = rekuire('moment');

module.exports = {

    generateDateNow: function () {
        var formattedDate;
        var date = new Date();
        return formattedDate = Moment(date).format('YYYY-MM-DD HH:MM:SS');
    }
}