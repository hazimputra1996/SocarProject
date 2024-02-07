// index.js

const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const carRoutes = require('./routes/carRoutes');
const availableCarRoutes = require('./routes/availableCarRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const listingRoutes = require('./routes/listingRoutes');


const app = express();
const PORT = process.env.PORT || 8002;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/cars', carRoutes);
app.use('/availableCar',availableCarRoutes);
app.use('/booking',bookingRoutes);
app.use('/listing',listingRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Microservice Listing is up and running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Microservice Listing is listening on port ${PORT}`);
});
