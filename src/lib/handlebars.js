const { format } = require('timeago.js');
//const {format} = timeago();
//const timeagoInstance = timeago();
const helpers = {};

helpers.timeago = (timestamp) => {
    return format(timestamp);
};

module.exports = helpers;