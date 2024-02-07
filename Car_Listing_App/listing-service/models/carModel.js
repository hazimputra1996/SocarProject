// models/carModel.js

const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  ownerId:String,
  plateNumber:String,
  brand: String,
  model: String,
  state:String,
  city:String,
  year: Number,
  milage:Number,
  availableCarList:[{
    availableDate: String,
    priceMonthly:Number
  }],
  bookingList:[{
    buyerId:String,
    date: String,
    price: Number,
    paymentDate: String,
    paymentMethod: String
  }]
},{collection:'carList'});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;