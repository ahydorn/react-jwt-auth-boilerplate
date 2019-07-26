const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const validateEmail = function(email) {
  return validator.isEmail(email);
};

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: function(email) {
      [validateEmail, 'Please enter a valid email address'];
    }
  },
  password: {
    type: String,
    // TODO: Add minimum length in here
    required: true
  }
});

// 2 ways to export.
// export as User following UserSchema
const User = mongoose.model('User', UserSchema);

module.exports = User;
