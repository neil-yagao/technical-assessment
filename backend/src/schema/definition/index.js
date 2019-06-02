var customer = require('./customer');
var note = require('./note')

module.exports = function() {
    return [customer,note];
}