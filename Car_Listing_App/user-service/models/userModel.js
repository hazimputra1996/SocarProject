// models/userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String, // Example field for Google OAuth2 user ID
  name: String, // Field for the user's name
  email: String, // Field for the user's email
  refreshToken: String,
  token: String,
},{collection:'userList'});

userSchema.statics.findOrCreate = function findOrCreate(condition, doc, callback) {
  const self = this;
  self.findOne(condition, (err, result) => {
    return result
      ? callback(err, result)
      : self.create(doc, (err, result) => {
          return callback(err, result);
        });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;