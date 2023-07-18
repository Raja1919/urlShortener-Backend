const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  Email: {
    type: String,
    unique: true,
  },
  Password: {
    type: String,
  },
});

const UserAuth = mongoose.model('UserAuth', userSchema);

module.exports = UserAuth;
