// routes/listingRoutes.js

const express = require('express');
const router = express.Router();
const validateToken = require('../validateToken');
const Car = require('../models/carModel'); 

// 1) Endpoint to get available cars based on multiple optional criteria
router.get('/available-cars', async (req, res) => {
  try {
    const { date, brand, model, state, city, priceMonthly, milage } = req.query;

    // Build the query dynamically based on the provided criteria
    const query = {};

    if (date) {
      query['availableCarList.availableDate'] = date;
      query['bookingList.date'] = { $ne: new Date(date) }; // Exclude bookings on the specified date
    }

    if (brand) {
      query.brand = brand;
    }
    if (model){
      query.model = model;
    }

    if (state) {
      query.state = state;
    }

    if (city) {
      query.city = city;
    }

    if (priceMonthly) {
      query['availableCarList.priceMonthly'] = { $gte: parseFloat(priceMonthly) };
    }

    if (milage) {
      query.milage = { $gte: parseFloat(milage) };
    }

    const availableCars = await Car.find(query);

    res.json({ availableCars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 2) POST in the carList which includes all except availableCarList and bookingList
router.post('/car', async (req, res) => {
  try {
    const { ownerId, plateNumber, brand, model, state, city, year, milage } = req.body;
    
    const newCar = new Car({
      ownerId,
      plateNumber,
      brand,
      model,
      state,
      city,
      year,
      milage,
      availableCarList: [],
      bookingList: []
    });

    await newCar.save();

    res.json({ message: 'Car created successfully', car: newCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 3) POST in the carList based on carID which includes only availableCarList
router.post('/car/:carId/available', async (req, res) => {
  try {
    const carId = req.params.carId;
    const { availableDate, priceMonthly } = req.body;

    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { $push: { availableCarList: { availableDate, priceMonthly } } },
      { new: true }
    );

    res.json({ message: 'Available car details added successfully', car: updatedCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 4) POST in the carList based on carID which includes only bookingList
router.post('/car/:carId/booking', async (req, res) => {
  try {
    const carId = req.params.carId;
    const { buyerId, date, price, paymentDate, paymentMethod } = req.body;

    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { $push: { bookingList: { buyerId, date, price, paymentDate, paymentMethod } } },
      { new: true }
    );

    res.json({ message: 'Booking details added successfully', car: updatedCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 5) Update car details in the carList based on carID
router.put('/car/:carId', async (req, res) => {
  try {
    const carId = req.params.carId;
    const { ownerId, plateNumber, brand, model, state, city, year, mileage } = req.body;

    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { ownerId, plateNumber, brand, model, state, city, year, mileage },
      { new: true }
    );

    res.json({ message: 'Car details updated successfully', car: updatedCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 6) Delete car from the carList based on carID
router.delete('/car/:carId', async (req, res) => {
  try {
    const carId = req.params.carId;

    const deletedCar = await Car.findByIdAndDelete(carId);

    res.json({ message: 'Car deleted successfully', car: deletedCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;