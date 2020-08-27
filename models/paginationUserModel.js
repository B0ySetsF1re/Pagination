const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String
  },
  username: {
    type: String
  },
  role: {
    type: String
  }
});

module.exports = mongoose.model('User', UserSchema);
