// models/userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email:String,
  name:String,
  address:String
},{collection:'carList'});

const User = mongoose.model('User', userSchema);

module.exports = User;