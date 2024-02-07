// routes/availableCarRoutes.js

const express = require('express');
const router = express.Router();
const AvailableCarList = require('../models/availableCarListModel');

// Get list of available cars
router.get('/', async (req, res) => {
  try {
    const availableCar = await AvailableCarList.find();
    res.json(availableCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new car listing
router.post('/', async (req, res) => {
  const { ownerId,carId,availableDate,priceHourly,priceDaily,priceMonthly,state,distinct} = req.body;

  try {
    const newAvailableCar = new AvailableCarList({ ownerId,carId,availableDate,priceHourly,priceDaily,priceMonthly,state,distinct});
    const savedAvailableCar = await newAvailableCar.save();
    res.status(201).json(savedAvailableCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get details of a specific car
router.get('/:availableCarId', async (req, res) => {
  const availableCarId = req.params.availableCarId;
  try {
    const carAvailable = await AvailableCarList.findById(availableCarId);
    if (!carAvailable) {
      return res.status(404).json({ message: 'Available Car ID not found' });
    }
    res.json(carAvailable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update details of a specific available car
router.put('/:availableCarId', async (req, res) => {
  const availableCarId = req.params.availableCarId;
  const { ownerId, carId, availableDate, priceHourly, priceDaily, priceMonthly, state, distinct } = req.body;

  try {
    const updatedAvailableCar = await AvailableCarList.findByIdAndUpdate(
      availableCarId,
      { ownerId, carId, availableDate, priceHourly, priceDaily, priceMonthly, state, distinct },
      { new: true }
    );
    if (!updatedAvailableCar) {
      return res.status(404).json({ message: 'Available Car ID not found' });
    }
    res.json(updatedAvailableCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a specific available car
router.delete('/:availableCarId', async (req, res) => {
  const availableCarId = req.params.availableCarId;

  try {
    const deletedAvailableCar = await AvailableCarList.findByIdAndDelete(availableCarId);
    if (!deletedAvailableCar) {
      return res.status(404).json({ message: 'Available Car ID not found' });
    }
    res.json({ message: 'Available Car deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

module.exports = router;
