// routes/carRoutes.js

const express = require('express');
const router = express.Router();
const BookingList = require('../models/bookingListModel');

// Get list of booking
router.get('/', async (req, res) => {
  try {
    const booking = await BookingList.find();
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new booking listing
router.post('/', async (req, res) => {
  const { buyerId,sellerId,carId,date,price,paymentDate,paymentMethod} = req.body;

  try {
    const newList = new BookingList({ buyerId,sellerId,carId,date,price,paymentDate,paymentMethod});
    const savedList = await newList.save();
    res.status(201).json(savedList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get details of a specific booking
router.get('/:listId', async (req, res) => {
  const listId = req.params.listId;
  try {
    const booking = await BookingList.findById(listId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update details of a specific booking
router.put('/:listId', async (req, res) => {
  const listId = req.params.listId;
  const { buyerId, sellerId, carId, date, price, paymentDate, paymentMethod } = req.body;

  try {
    const updatedBooking = await BookingList.findByIdAndUpdate(listId, { buyerId, sellerId, carId, date, price, paymentDate, paymentMethod }, { new: true });
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a specific booking
router.delete('/:listId', async (req, res) => {
  const listId = req.params.listId;

  try {
    const deletedBooking = await BookingList.findByIdAndDelete(listId);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
