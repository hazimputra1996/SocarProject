// models/bookingListModel.js

const mongoose = require('mongoose');

const bookingListSchema = new mongoose.Schema({
  buyerId:String,
  sellerId:String,
  carId:String,
  date: Date,
  price: Number,
  paymentDate: Date,
  paymentMethod: String
},{collection:'bookingList'});

const BookingList = mongoose.model('BookingList', bookingListSchema);

module.exports = BookingList;