// routes/carRoutes.js

const express = require('express');
const router = express.Router();
const Car = require('../models/carModel');

// Get list of cars
router.get('/', async (req, res) => {
  try {
    const filter = {};
    // Check if a specific parameter exists in the query and apply the filter accordingly
    if (req.query.ownerId) {
      filter.ownerId = req.query.ownerId;
    }

    const cars = await Car.find(filter);
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new car listing
router.post('/', async (req, res) => {
  const { ownerId,plateNumber,brand,model,year,milage} = req.body;

  try {
    const newCar = new Car({ ownerId,plateNumber,brand,model,year,milage});
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get details of a specific car
router.get('/:carId', async (req, res) => {
  const carId = req.params.carId;
  try {
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update details of a specific car
router.put('/:carId', async (req, res) => {
  const carId = req.params.carId;
  const { ownerId, plateNumber, brand, model, year, milage } = req.body;

  try {
    const updatedCar = await Car.findByIdAndUpdate(carId, { ownerId, plateNumber, brand, model, year, milage }, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(updatedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a specific car
router.delete('/:carId', async (req, res) => {
  const carId = req.params.carId;

  try {
    const deletedCar = await Car.findByIdAndDelete(carId);
    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
