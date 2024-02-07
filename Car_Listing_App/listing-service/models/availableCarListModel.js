// models/availableCarListModel.js

const mongoose = require('mongoose');

const availableCarListSchema = new mongoose.Schema({
  ownerId:String,
  carId:String,
  availableDate: String,
  priceHourly: Number,
  priceDaily: Number,
  priceMonthly:Number,
  state:String,
  city:String
},{collection:'availableCarList'});

const AvailableCarList = mongoose.model('AvailableCarList', availableCarListSchema);

module.exports = AvailableCarList;