const uuidV4 = require('uuid/v4');

module.exports = {

	getUUID: function() {
    return uuidV4();
  },

  generateCode: function() {
    var chars = '0123456789';
    var result = '';
    for (var i = 5; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  },

}