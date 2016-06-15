var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  displayName: {
    type: String
  },
  image: {
    type: String
  },
  email: {
    type: String
  },
  google: {
    type: Object
  }
});

module.exports = mongoose.model('User', UserSchema);
